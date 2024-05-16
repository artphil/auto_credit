import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyCreateDTO } from './dto/companyCreate.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Company')
@Controller('company')
export class CompanyController {
  constructor(private service: CompanyService) {}

  @Get()
  async getAll() {
    return await this.service.getAll();
  }

  @Get(':id')
  async getOne(@Param('id') id) {
    return await this.service.getOne(id);
  }

  @Get('representative/:id')
  async getbyUser(@Param('id') id) {
    return await this.service.getbyPerson(id);
  }

  @Post()
  async create(@Body() data: CompanyCreateDTO) {
    return await this.service.create(data);
  }

  @Put(':id')
  async update(@Param('id') id, @Body() data: CompanyCreateDTO) {
    return await this.service.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id) {
    return await this.service.remove(id);
  }
}
