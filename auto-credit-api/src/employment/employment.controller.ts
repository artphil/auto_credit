import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { EmploymentService } from './employment.service';
import { EmploymentCreateDTO } from './dto/employmentCreate.dto';
import { EmploymentEntity } from './employment.entity';
import { EmploymentResponseDTO } from './dto/employmentResponse.dto';

@ApiTags('Employment')
@Controller('employment')
export class EmploymentController {
  constructor(private service: EmploymentService) {}

  @ApiResponse({
    status: 200,
    description: 'Recupera os dados de uma relação de trabalho por ID',
    type: EmploymentEntity,
  })
  @Get(':id')
  async getOne(@Param('id') id: string) {
    return await this.service.getOne(id);
  }

  @ApiResponse({
    status: 200,
    description: 'Todos as relações de trabalho',
    type: Array<EmploymentResponseDTO>,
  })
  @Get()
  async getAll() {
    return await this.service.getAll();
  }

  @ApiResponse({
    status: 200,
    description:
      'Recupera os dados de uma relação de trabalho pelo ID do funcionário',
    type: EmploymentEntity,
  })
  @Get('employee/:id')
  async getByEmployee(@Param('id') id: string) {
    return await this.service.getByEmployee(id);
  }

  @ApiResponse({
    status: 200,
    description:
      'Recupera os dados de uma relação de trabalho pelo ID da empresa',
    type: EmploymentEntity,
  })
  @Get('company/:id')
  async getByCompany(@Param('id') id: string) {
    return await this.service.getByCompany(id);
  }

  @ApiResponse({
    status: 201,
    description: 'Cria dados de uma relação de trabalho',
    type: EmploymentResponseDTO,
  })
  @Post()
  async create(@Body() personData: EmploymentCreateDTO) {
    return await this.service.create(personData);
  }

  @ApiResponse({
    status: 200,
    description: 'Atualiza os dados de uma relação de trabalho por ID',
    type: EmploymentEntity,
  })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() personData: EmploymentCreateDTO,
  ) {
    return await this.service.update(id, personData);
  }

  @ApiResponse({
    status: 200,
    description: 'Apaga os dados de uma relação de trabalho por ID',
  })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.service.remove(id);
  }
}
