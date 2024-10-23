import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';
import { Vendor, VendorDocument } from './vendor.schema';

export type ProductDocument = HydratedDocument<Product>;

@Schema({ collection: 'products' })
export class Product {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: String, required: true })
  imageUrl: string;

  @Prop({ type: Number, required: true })
  price: number;

  @Prop({ type: Number, required: false, default: 0 })
  rate?: number;

  @Prop({ type: Boolean, required: false, default: false })
  isDeleted?: boolean;

  @Prop({ type: Number, required: true })
  quantity: number;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Vendor',
  })
  vendorId: mongoose.Types.ObjectId | VendorDocument;

  @Prop({ type: Date, required: false, default: Date.now() })
  createdAt?: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
