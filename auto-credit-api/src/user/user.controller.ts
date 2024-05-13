import { UserModel } from './user.model';
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
  async createUser(@Body() userData: UserModel) {
    return this.userRepository.save(userData);
  }
}
