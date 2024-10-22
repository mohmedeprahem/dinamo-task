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
}
