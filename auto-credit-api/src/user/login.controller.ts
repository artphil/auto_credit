import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserLoginDTO } from './dto/userLogin.dto';
import { UserResponseDTO } from './dto/userResponse.dto';

@ApiTags('Login')
@Controller('login')
export class LoginController {
  constructor(private service: UserService) {}

  @ApiResponse({
    status: 200,
    type: UserResponseDTO,
  })
  @Post()
  async create(@Body() user: UserLoginDTO) {
    return await this.service.login(user.username, user.password);
  }
}
