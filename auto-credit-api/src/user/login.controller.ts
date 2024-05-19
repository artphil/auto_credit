import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserLoginDTO } from './dto/userLogin.dto';

@ApiTags('Login')
@Controller('login')
export class LoginController {
  constructor(private service: UserService) {}

  @Post()
  async create(@Body() user: UserLoginDTO) {
    return await this.service.login(user.username, user.password);
  }
}
