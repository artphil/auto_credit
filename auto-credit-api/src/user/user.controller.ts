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
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from './user.entity';
import { UserResponseDTO } from './dto/userResponse.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private service: UserService) {}

  @ApiResponse({
    status: 200,
    description: 'Recupera um usuário por ID',
    type: UserEntity,
  })
  @Get(':id')
  async getOne(@Param('id') id: string) {
    return await this.service.getOne(id);
  }

  @ApiResponse({
    status: 200,
    description: 'Todos os usuários',
    type: Array<UserResponseDTO>,
  })
  @Get()
  async getAll() {
    return await this.service.getAll();
  }

  @ApiResponse({
    status: 201,
    description: 'Cria um usuário',
    type: UserResponseDTO,
  })
  @Post()
  async create(@Body() userData: UserCreateDTO) {
    return await this.service.create(userData);
  }

  @ApiResponse({
    status: 200,
    description: 'Atualiza os dados de um usuário por ID',
    type: UserEntity,
  })
  @Put(':id')
  async update(@Param('id') id: string, @Body() userData: UserUpdateDTO) {
    return await this.service.update(id, userData);
  }
  @ApiResponse({
    status: 200,
    description: 'Apaga os dados de um usuário por ID',
  })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.service.remove(id);
  }
}
