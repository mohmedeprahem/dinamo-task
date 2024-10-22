import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model, QueryOptions } from 'mongoose';
import { User, UserDocument } from 'src/schemas';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(userData: User, session: ClientSession): Promise<UserDocument> {
    const createdUser = new this.userModel(userData);
    return createdUser.save({ session });
  }

  async findOne(conditions: QueryOptions<User>): Promise<UserDocument | null> {
    return this.userModel.findOne(conditions);
  }
}
