import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Vendor, VendorSchema } from 'src/schemas';
import { VendorRepository } from 'src/repositories';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Vendor.name, schema: VendorSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService, VendorRepository],
})
export class UserModule {}
