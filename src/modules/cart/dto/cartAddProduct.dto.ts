import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsString,
  MaxLength,
  MinLength,
  isString,
} from 'class-validator';

export class CartAddProductDTO {
  @ApiProperty({
    example: '1',
    description: 'Product id',
    required: true,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  productId: string;

  @ApiProperty({
    example: 5,
    description: 'Quantity of product',
    required: true,
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}
