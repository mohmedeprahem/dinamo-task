import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user.schema';
import { Vendor, VendorSchema } from 'src/schemas/vendor.schema';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { Cart, CartSchema } from 'src/schemas/cart.schema';
import {
  CartRepository,
  UserRepository,
  VendorRepository,
} from 'src/repositories';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      {
        name: Vendor.name,
        schema: VendorSchema,
      },
      {
        name: Cart.name,
        schema: CartSchema,
      },
    ]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, CartRepository, UserRepository, VendorRepository],
})
export class AuthModule {}
