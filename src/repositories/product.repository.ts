import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model, QueryOptions } from 'mongoose';
import { Product, ProductDocument } from 'src/schemas';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async create(
    newProduct: Product,
    session: ClientSession,
  ): Promise<ProductDocument> {
    const createdProduct = new this.productModel(newProduct);
    return createdProduct.save({ session });
  }

  async find(conditions: QueryOptions<Product>): Promise<ProductDocument[]> {
    return this.productModel.find(conditions).exec();
  }
}
