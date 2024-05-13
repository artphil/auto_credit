import { UserCreateDTO } from './dto/userCreate.dto';
import { UserUpdateDTO } from './dto/userUpdate.dto';
import { UserRepository } from './user.repository';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(private userRepository: UserRepository) {}

  @Get()
  async getOne(@Param('id') id) {
    return this.userRepository.get(id);
  }

  @Get()
  async getAll() {
    return this.userRepository.getAll();
  }

  @Post()
  async create(@Body() userData: UserCreateDTO) {
    return this.userRepository.save(userData);
  }

  @Put(':id')
  async update(@Param('id') id, @Body() userData: UserUpdateDTO) {
    return await this.userRepository.update(id, userData);
  }

  @Delete(':id')
  async remove(@Param('id') id) {
    return await this.userRepository.remove(id);
  }
}
