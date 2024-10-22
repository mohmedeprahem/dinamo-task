import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { VendorCreateDTO } from './dto';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard)
  @Post('vendors')
  @ApiBearerAuth('token')
  async createVendor(@Req() req: any, @Body() body: VendorCreateDTO) {
    if (req.user.isVendor) {
      throw new Error('Only users can create vendors');
    }

    const createdVendor = await this.userService.createVendor(
      body,
      req.user.id,
    );

    return {
      success: true,
      status: 201,
      message: 'Vendor created successfully',
    };
  }
}
