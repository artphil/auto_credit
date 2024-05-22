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
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CompanyEntity } from './company.entity';
import { CompanyResponseDTO } from './dto/companyResponse.dto';

@ApiTags('Company')
@Controller('company')
export class CompanyController {
  constructor(private service: CompanyService) {}

  @ApiResponse({
    status: 200,
    description: 'Recupera os dados de uma empresa por ID',
    type: CompanyEntity,
  })
  @Get(':id')
  async getOne(@Param('id') id) {
    return await this.service.getOne(id);
  }

  @ApiResponse({
    status: 200,
    description: 'Todos os dados de pessoas',
    type: Array<CompanyResponseDTO>,
  })
  @Get()
  async getAll() {
    return await this.service.getAll();
  }

  @ApiResponse({
    status: 200,
    description: 'Recupera os dados de uma empresa pelo ID do representante',
    type: CompanyEntity,
  })
  @Get('representative/:id')
  async getbyUser(@Param('id') id) {
    return await this.service.getByPerson(id);
  }

  @ApiResponse({
    status: 201,
    description: 'Cria dados de uma empresa',
    type: CompanyResponseDTO,
  })
  @Post()
  async create(@Body() data: CompanyCreateDTO) {
    return await this.service.create(data);
  }

  @ApiResponse({
    status: 200,
    description: 'Atualiza os dados de uma empresa por ID',
    type: CompanyEntity,
  })
  @Put(':id')
  async update(@Param('id') id, @Body() data: CompanyCreateDTO) {
    return await this.service.update(id, data);
  }

  @ApiResponse({
    status: 200,
    description: 'Apaga os dados de uma empresa por ID',
  })
  @Delete(':id')
  async remove(@Param('id') id) {
    return await this.service.remove(id);
  }
}
