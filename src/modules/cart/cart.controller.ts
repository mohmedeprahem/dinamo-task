import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Put,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CartService } from './cart.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { CartAddProductDTO } from './dto';
import mongoose from 'mongoose';

@ApiTags('carts')
@Controller('carts')
export class CartController {
  constructor(private cartService: CartService) {}

  @UseGuards(AuthGuard)
  @Put()
  @ApiBearerAuth('token')
  async addProductToCart(@Req() request, @Body() body: CartAddProductDTO) {
    if (request.user.isVendor)
      throw new UnauthorizedException('Only users can add products to cart');

    const cart = await this.cartService.addProductToCart(request.user.id, body);

    return {
      success: true,
      status: 200,
      message: 'Product added to cart successfully',
    };
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('token')
  @Get()
  async getCart(@Req() request) {
    if (request.user.isVendor)
      throw new UnauthorizedException('Only users can get cart');

    const cartData = await this.cartService.getCart(request.user.id);

    return {
      success: true,
      status: 200,
      data: {
        cart: {
          id: cartData._id,
          products: cartData.products.map((product) => {
            return product.id instanceof mongoose.Types.ObjectId
              ? null
              : {
                  id: product.id._id,
                  name: product.id.name,
                  price: product.id.price,
                  imageUrl: product.id.imageUrl,
                  quantity: product.quantity,
                };
          }),
        },
      },
    };
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('token')
  @Delete('products/:ProductId')
  async removeProductFromCart(
    @Req() request,
    @Param('ProductId') ProductId: string,
  ) {
    if (request.user.isVendor)
      throw new UnauthorizedException(
        'Only users can remove products from cart',
      );

    const cart = await this.cartService.removeProductFromCart(
      request.user.id,
      ProductId,
    );

    return {
      success: true,
      status: 200,
      message: 'Product removed from cart successfully',
    };
  }
}
