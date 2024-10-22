import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { VendorRepository } from 'src/repositories';
import { VendorCreateDTO } from './dto';
import { Vendor } from 'src/schemas';

@Injectable()
export class UserService {
  constructor(
    private vendorRepository: VendorRepository,
    @InjectConnection() private readonly connection: mongoose.Connection,
  ) {}

  async createVendor(body: VendorCreateDTO, userId: string) {
    const session = await this.connection.startSession();
    session.startTransaction();
    try {
      const existingVendor = await this.vendorRepository.findOne({
        userId: new mongoose.Types.ObjectId(userId),
      });
      if (existingVendor) {
        throw new Error('Vendor already exists');
      }

      const newVendor: Vendor = {
        userId: new mongoose.Types.ObjectId(userId),
        name: body.name,
        description: body.description,
      };

      const vendor = await this.vendorRepository.create(newVendor, session);

      await session.commitTransaction();
      session.endSession();
      return vendor;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      return error;
    }
  }
}
