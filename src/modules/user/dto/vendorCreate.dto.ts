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

export class VendorCreateDTO {
  // bussiness name
  @ApiProperty({
    example: 'dinamo',
    description: 'Vendor name',
    required: true,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  name: string;

  @ApiProperty({
    example: 'This is a description',
    description: 'Vendor description',
    required: true,
    type: String,
  })
  @IsString()
  @MinLength(5)
  @MaxLength(50)
  description: string;
}
