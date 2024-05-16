import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserCreateDTO } from './dto/userCreate.dto';
import { UserUpdateDTO } from './dto/userUpdate.dto';

@Controller('user')
export class UserController {
  constructor(private service: UserService) {}

  @Get(':id')
  async getOne(@Param('id') id) {
    return await this.service.getOne(id);
  }

  @Get()
  async getAll() {
    return await this.service.getAll();
  }

  @Post()
  async create(@Body() userData: UserCreateDTO) {
    return await this.service.create(userData);
  }

  @Put(':id')
  async update(@Param('id') id, @Body() userData: UserUpdateDTO) {
    return await this.service.update(id, userData);
  }

  @Delete(':id')
  async remove(@Param('id') id) {
    return await this.service.remove(id);
  }
}
