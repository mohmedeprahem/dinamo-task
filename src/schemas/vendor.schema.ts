import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';

export type VendorDocument = HydratedDocument<Vendor>;

@Schema({ collection: 'vendors' })
export class Vendor {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: Number, required: false, default: 0 })
  rate?: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' })
  userId: mongoose.Types.ObjectId;

  @Prop({ type: Date, required: false, default: Date.now() })
  createdAt?: Date;
}

export const VendorSchema = SchemaFactory.createForClass(Vendor);
