import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class LoginDTO {
  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'User email',
    required: true,
    type: String,
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '123456',
    description: 'User password',
    required: true,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(50)
  password: string;

  @ApiProperty({
    example: true,
    description: 'Is vendor',
    required: true,
    type: Boolean,
  })
  @IsNotEmpty()
  isVendor: boolean;
}
