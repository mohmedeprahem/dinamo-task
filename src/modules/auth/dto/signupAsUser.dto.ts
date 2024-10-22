import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class SignupAsUserDTO {
  @ApiProperty({
    example: 'John Doe',
    description: 'User full name',
    required: true,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  fullName: string;

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
    example: '01123456789',
    description: 'User phone',
    required: true,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(11)
  @MaxLength(11)
  phone: string;

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
}
