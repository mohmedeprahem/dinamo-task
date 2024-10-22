import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ collection: 'users' })
export class User {
  @Prop({ type: String, required: true })
  fullName: string;

  @Prop({ type: String, required: true })
  email: string;

  @Prop({ type: String, required: false })
  phone: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: Date, required: false, default: Date.now() })
  createdAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
