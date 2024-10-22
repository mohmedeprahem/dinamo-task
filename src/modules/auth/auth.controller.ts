import { Body, Controller, Post } from '@nestjs/common';
import { SignupAsUserDTO } from './dto/signupAsUser.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('signup')
  async signupAsUser(@Body() body: SignupAsUserDTO) {
    console.log(body);
    await this.authService.signupAsUser(body);
    return {
      success: true,
      status: 201,
      message: 'User created successfully',
    };
  }

  @Post('login')
  async login(@Body() body: LoginDTO) {
    const token = await this.authService.login(body);

    return {
      success: true,
      status: 200,
      data: {
        token,
      },
      message: 'User logged in successfully',
    };
  }
}
