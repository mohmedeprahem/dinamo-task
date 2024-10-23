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
} from 'class-validator';

export class ProductUpdateDTO {
  @ApiProperty({
    example: 'Book',
    description: 'Product name',
    required: true,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  name: string;

  @ApiProperty({
    example: 'Book description',
    description: 'Product description',
    required: true,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(1000)
  description: string;

  @ApiProperty({
    example: 10.0,
    description: 'Product price',
    required: true,
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({
    example: 10,
    description: 'Product quantity',
    required: true,
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}