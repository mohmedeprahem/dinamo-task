import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model, QueryOptions } from 'mongoose';
import { Vendor, VendorDocument } from 'src/schemas';

@Injectable()
export class VendorRepository {
  constructor(@InjectModel(Vendor.name) private userModel: Model<Vendor>) {}

  async create(
    vendorData: Vendor,
    session: ClientSession,
  ): Promise<VendorDocument> {
    const createdVendor = new this.userModel(vendorData);
    return createdVendor.save({ session });
  }

  async findOne(
    conditions: QueryOptions<Vendor>,
  ): Promise<VendorDocument | null> {
    return this.userModel.findOne(conditions);
  }
}
