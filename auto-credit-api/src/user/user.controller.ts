import { UserCreateDTO } from './dto/userCreate.dto';
import { UserRepository } from './user.repository';
import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(private userRepository: UserRepository) {}

  @Get()
  async getAll() {
    return this.userRepository.getAll();
  }

  @Post()
  async createUser(@Body() userData: UserCreateDTO) {
    return this.userRepository.save(userData);
  }
}
