import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PersonService } from './person.service';
import { PersonCreateDTO } from './dto/personCreate.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { PersonEntity } from './person.entity';
import { PersonResponseDTO } from './dto/personResponse.dto';

@ApiTags('Person')
@Controller('person')
export class PersonController {
  constructor(private service: PersonService) {}

  @ApiResponse({
    status: 200,
    description: 'Recupera os dados de uma pessoa por ID',
    type: PersonEntity,
  })
  @Get(':id')
  async getOne(@Param('id') id: string) {
    return await this.service.getOne(id);
  }

  @ApiResponse({
    status: 200,
    description: 'Todos os dados de pessoas',
    type: Array<PersonResponseDTO>,
  })
  @Get()
  async getAll() {
    return await this.service.getAll();
  }

  @ApiResponse({
    status: 200,
    description: 'Recupera os dados de uma pessoa pelo ID de usuário',
    type: PersonEntity,
  })
  @Get('user/:id')
  async getbyUser(@Param('id') id: string) {
    return await this.service.getByUser(id);
  }

  @ApiResponse({
    status: 201,
    description: 'Cria dados de uma pessoa',
    type: PersonResponseDTO,
  })
  @Post()
  async create(@Body() personData: PersonCreateDTO) {
    return await this.service.create(personData);
  }

  @ApiResponse({
    status: 200,
    description: 'Atualiza os dados de uma pessoa por ID',
    type: PersonEntity,
  })
  @Put(':id')
  async update(@Param('id') id: string, @Body() personData: PersonCreateDTO) {
    return await this.service.update(id, personData);
  }

  @ApiResponse({
    status: 200,
    description: 'Apaga os dados de uma pessoa por ID',
  })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.service.remove(id);
  }
}
