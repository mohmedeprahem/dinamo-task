import {
  Body,
  Controller,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { ProductCreateDTO } from './dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { InjectConnection } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { AuthGuard } from 'src/guards/auth.guard';
@ApiTags('product')
@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @UseGuards(AuthGuard)
  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  @ApiBearerAuth('token')
  async create(
    @UploadedFile() image: Express.Multer.File,
    @Body() body: ProductCreateDTO,
    @Req() req: any,
  ) {
    if (!req.user.isVendor) {
      throw new Error('Only vendors can create products');
    }

    const createdProduct = await this.productService.create(
      body,
      image,
      req.user.vendorId,
    );

    return {
      success: true,
      status: 201,
      message: 'Product created successfully',
    };
  }
}
