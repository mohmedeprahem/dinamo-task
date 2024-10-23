import {
  Body,
  Controller,
  Put,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CartService } from './cart.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { CartAddProductDTO } from './dto';

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
}
