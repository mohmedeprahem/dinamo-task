import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';
import { User } from './user.schema';
import { ProductDocument } from './product.schema';

export type CartDocument = HydratedDocument<Cart>;

@Schema({ collection: 'carts' })
export class Cart {
  @Prop({
    type: [
      {
        quantity: { type: Number, required: true },
        id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      },
    ],
    required: true,
  })
  products: {
    quantity: number;
    id: mongoose.Types.ObjectId | ProductDocument;
  }[];

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  userId: mongoose.Types.ObjectId;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
