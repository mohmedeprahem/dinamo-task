import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { ClientSession, Model, QueryOptions } from 'mongoose';
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

  async find(
    conditions: QueryOptions<Product>,
    options: { skip: number; limit: number },
    populate?: string[],
  ): Promise<ProductDocument[]> {
    let query = this.productModel
      .find(conditions)
      .skip(options.skip)
      .limit(options.limit);

    if (populate) {
      populate.forEach((field) => {
        query = query.populate(field.trim());
      });
    }

    return await query.exec();
  }

  async count(conditions: QueryOptions<Product> = {}): Promise<number> {
    return await this.productModel.countDocuments(conditions).exec();
  }

  async findOne(
    conditions: QueryOptions<Product>,
    populate?: string[],
  ): Promise<ProductDocument> {
    let query = this.productModel.findOne(conditions);

    if (populate) {
      populate.forEach((field) => {
        query = query.populate(field.trim());
      });
    }

    return await query.exec();
  }

  async findById(id: string): Promise<ProductDocument> {
    return this.productModel.findById(id).exec();
  }

  async updateById(
    id: string,
    body: Product,
    session: ClientSession,
  ): Promise<ProductDocument> {
    return await this.productModel
      .findByIdAndUpdate(id, body, { new: true, session })
      .exec();
  }

  async update(
    conditions: QueryOptions<Product>,
    body: Product,
    session: ClientSession,
  ): Promise<boolean> {
    const result = await this.productModel
      .updateOne(conditions, body, { new: true, session })
      .exec();

    return result.modifiedCount > 0;
  }
}
