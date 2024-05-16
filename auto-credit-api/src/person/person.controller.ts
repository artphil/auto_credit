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
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Person')
@Controller('person')
export class PersonController {
  constructor(private service: PersonService) {}

  @Get()
  async getAll() {
    return await this.service.getAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return await this.service.getOne(id);
  }

  @Get('user/:id')
  async getbyUser(@Param('id') id: string) {
    return await this.service.getByUser(id);
  }

  @Post()
  async create(@Body() personData: PersonCreateDTO) {
    return await this.service.create(personData);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() personData: PersonCreateDTO) {
    return await this.service.update(id, personData);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.service.remove(id);
  }
}
