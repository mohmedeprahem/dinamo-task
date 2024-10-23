import { Injectable } from '@nestjs/common';
import { ProductRepository, VendorRepository } from 'src/repositories';
import { ProductCreateDTO, ProductUpdateDTO } from './dto';
import { Product, ProductDocument } from 'src/schemas';
import { promises as fs } from 'fs';
import { InjectConnection } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Injectable()
export class ProductService {
  constructor(
    private productRepository: ProductRepository,
    @InjectConnection() private readonly connection: mongoose.Connection,
  ) {}

  async create(
    body: ProductCreateDTO,
    image: Express.Multer.File,
    vendorId: string,
  ) {
    const session = await this.connection.startSession();
    session.startTransaction();

    try {
      const timestamp = Date.now();
      const uniqueFilename = `${timestamp}-${image.filename}.${image.mimetype.split('/')[1]}`;

      await fs.writeFile(`./uploads/images/${uniqueFilename}`, image.buffer);

      const newProduct: Product = {
        name: body.name,
        description: body.description,
        price: body.price,
        quantity: body.quantity,
        imageUrl: uniqueFilename,
        vendorId: new mongoose.Types.ObjectId(vendorId),
      };

      const createdProduct = await this.productRepository.create(
        newProduct,
        session,
      );

      await session.commitTransaction();
      session.endSession();

      return createdProduct;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  }

  async getProductsWithVendor(paginationParams: {
    page: number;
    limit: number;
  }) {
    const { page, limit } = paginationParams;
    const skip = (page - 1) * limit;

    const products = await this.productRepository.find({}, { skip, limit }, [
      'vendorId',
    ]);

    const totalProducts = await this.productRepository.count();
    return {
      products,
      total: totalProducts,
      page,
      limit,
      totalPages: Math.ceil(totalProducts / limit),
    };
  }

  async findOneById(id: string) {
    return await this.productRepository.findOne({ _id: id }, ['vendorId']);
  }

  async update(VendorId: string, id: string, body: ProductUpdateDTO) {
    const session = await this.connection.startSession();
    session.startTransaction();

    try {
      const product = await this.productRepository.findOne({ _id: id });
      if (!product) {
        throw new Error('Product not found');
      }

      if (product.vendorId.toString() !== VendorId) {
        throw new Error('You are not authorized to update this product');
      }

      product.name = body.name;
      product.description = body.description;
      product.price = body.price;
      product.quantity = body.quantity;
      const updatedProduct = await this.productRepository.updateById(
        id,
        product,
        session,
      );

      await session.commitTransaction();
      session.endSession();

      return updatedProduct;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  }
}
