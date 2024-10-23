import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model, QueryOptions } from 'mongoose';
import { Cart, CartDocument } from 'src/schemas';

@Injectable()
export class CartRepository {
  constructor(@InjectModel(Cart.name) private cartModel: Model<Cart>) {}

  async create(newCart: Cart, session: ClientSession): Promise<CartDocument> {
    const createdCart = new this.cartModel(newCart);
    return createdCart.save({ session });
  }

  async findById(id: string): Promise<CartDocument> {
    return this.cartModel.findById(id).exec();
  }

  async findOne(
    conditions: QueryOptions<Cart> = {},
    populate?: { path: string; model?: string }[],
  ): Promise<CartDocument> {
    let query = this.cartModel.findOne(conditions);

    if (populate) {
      query = query.populate(populate);
    }

    return query.exec();
  }

  async update(
    conditions: QueryOptions<Cart>,
    body: Cart,
    session: ClientSession,
  ): Promise<boolean> {
    const result = await this.cartModel
      .updateOne(conditions, body, { new: true, session })
      .exec();

    return result.modifiedCount > 0;
  }
}
