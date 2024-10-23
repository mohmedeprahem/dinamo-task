import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  Req,
  UnauthorizedException,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { ProductCreateDTO, ProductUpdateDTO } from './dto';
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

  @Get()
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Page number',
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Number of items per page',
    example: 10,
  })
  async getAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    const productsData = await this.productService.getProductsWithVendor({
      page,
      limit,
    });

    return {
      success: true,
      status: 200,
      data: productsData.products.map((product) => ({
        id: product._id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        rate: product.rate,
        vendor:
          product.vendorId instanceof mongoose.Types.ObjectId
            ? null
            : {
                id: product.vendorId._id,
                name: product.vendorId.name,
              },
      })),
    };
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    const product = await this.productService.findOneById(id);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return {
      success: true,
      status: 200,
      data: {
        id: product._id,
        name: product.name,
        price: product.price,
        description: product.description,
        imageUrl: product.imageUrl,
        rate: product.rate,
        vendor:
          product.vendorId instanceof mongoose.Types.ObjectId
            ? null
            : {
                id: product.vendorId._id,
                name: product.vendorId.name,
              },
      },
    };
  }

  @Put(':productId')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('token')
  async update(
    @Req() req: any,
    @Param('productId') productId: string,
    @Body() body: ProductUpdateDTO,
  ) {
    if (!req.user.isVendor) {
      throw new UnauthorizedException('Only vendors can create products');
    }

    const updatedProduct = await this.productService.update(
      req.user.vendorId,
      productId,
      body,
    );

    if (!updatedProduct) {
      throw new NotFoundException('Product not found');
    }

    return {
      success: true,
      status: 200,
      message: 'Product updated successfully',
    };
  }

  @Delete(':productId')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('token')
  async delete(@Req() req: any, @Param('productId') productId: string) {
    if (!req.user.isVendor) {
      throw new UnauthorizedException('Only vendors can create products');
    }
    const deletedProduct = await this.productService.delete(
      productId,
      req.user.vendorId,
    );

    if (!deletedProduct) {
      throw new NotFoundException('Product not found');
    }

    return {
      success: true,
      status: 200,
      message: 'Product deleted successfully',
    };
  }
}
