import { Injectable } from '@nestjs/common';
import { CartAddProductDTO } from './dto';
import { InjectConnection } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { CartRepository, ProductRepository } from 'src/repositories';

@Injectable()
export class CartService {
  constructor(
    private cartRepository: CartRepository,
    private productRepository: ProductRepository,
    @InjectConnection() private readonly connection: mongoose.Connection,
  ) {}

  async addProductToCart(userId: string, body: CartAddProductDTO) {
    const session = await this.connection.startSession();
    session.startTransaction();

    try {
      const product = await this.productRepository.findOne({
        _id: body.productId,
        isDeleted: false,
      });

      if (!product) {
        throw new Error('Product not found');
      }

      if (product.quantity < body.quantity)
        throw new Error('Insufficient quantity');

      product.quantity -= body.quantity;

      await this.productRepository.update(
        { _id: body.productId },
        product,
        session,
      );

      const cart = await this.cartRepository.findOne({
        userId: userId,
      });

      if (!cart) {
        throw new Error('Cart not found');
      }

      const existingProduct = cart.products.find(
        (p) => p.id.toString() === body.productId,
      );

      if (existingProduct) {
        throw new Error('Product already in cart');
      }

      cart.products.push({
        id: product._id,
        quantity: body.quantity,
      });

      const updatedCart = await this.cartRepository.update(
        { _id: cart._id },
        cart,
        session,
      );

      await session.commitTransaction();
      session.endSession();

      return updatedCart;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  }

  async getCart(userId: string) {
    return await this.cartRepository.findOne({ userId }, [
      { path: 'products.id', model: 'Product' },
    ]);
  }
}
