import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { SignupAsUserDTO } from './dto/signupAsUser.dto';
import { Cart, User, UserDocument, VendorDocument } from 'src/schemas';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, connection } from 'mongoose';
import { PasswordHelper } from 'src/helpers/password.helper';
import { LoginDTO } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import {
  UserRepository,
  CartRepository,
  VendorRepository,
} from 'src/repositories';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private cartRepository: CartRepository,
    private vendorRepository: VendorRepository,
    private jwtService: JwtService,
    @InjectConnection() private readonly connection: mongoose.Connection,
  ) {}

  async signupAsUser(body: SignupAsUserDTO) {
    const session = await this.connection.startSession();
    session.startTransaction();

    try {
      const existingUser = await this.userRepository.findOne({
        email: body.email,
      });
      if (existingUser) {
        throw new ConflictException('User already exists');
      }

      const hashedPassword = await PasswordHelper.hashPassword(body.password);

      const newUser: User = {
        fullName: body.fullName,
        email: body.email,
        phone: body.phone,
        password: hashedPassword,
      };

      const createdUser = await this.userRepository.create(newUser, session);
      console.log(createdUser);

      const newCart: Cart = {
        userId: createdUser._id,
        products: [],
      };

      const createdCart = await this.cartRepository.create(newCart, session);

      console.log(createdCart);

      await session.commitTransaction();
      session.endSession();

      return newUser;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  }

  async login(body: LoginDTO) {
    let user = await this.userRepository.findOne({ email: body.email });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    let vendor: VendorDocument;
    if (body.isVendor) {
      vendor = await this.vendorRepository.findOne({ userId: user.id });
      if (!vendor) {
        throw new NotFoundException('Vendor not found');
      }
    }

    const isPasswordValid = await PasswordHelper.comparePassword(
      body.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new ConflictException('Invalid password');
    }
    console.log(user);
    const payload = {
      id: user._id.toString(),
      email: user.email,
      isVendor: body.isVendor,
    };
    const token = await this.jwtService.signAsync(payload);

    return token;
  }
}
