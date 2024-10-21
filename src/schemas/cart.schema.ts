import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';

export type CartDocument = HydratedDocument<Cart>;

@Schema()
export class Cart {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  id: mongoose.Schema.Types.ObjectId;

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
    id: mongoose.Schema.Types.ObjectId;
  }[];
}

export const CartSchema = SchemaFactory.createForClass(Cart);
