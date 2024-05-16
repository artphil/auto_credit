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

@Controller('person')
export class PersonController {
  constructor(private personService: PersonService) {}

  @Get(':id')
  async getOne(@Param('id') id) {
    return await this.personService.getOne(id);
  }

  @Get('user/:id')
  async getbyUser(@Param('id') id) {
    return await this.personService.getbyUser(id);
  }

  @Post()
  async create(@Body() personData: PersonCreateDTO) {
    return await this.personService.create(personData);
  }

  @Put(':id')
  async update(@Param('id') id, @Body() personData: PersonCreateDTO) {
    return await this.personService.update(id, personData);
  }

  @Delete(':id')
  async remove(@Param('id') id) {
    return await this.personService.remove(id);
  }
}
