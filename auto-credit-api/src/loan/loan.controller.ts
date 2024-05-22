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
import { LoanService } from './loan.service';
import { LoanCreateDTO } from './dto/loanCreate.dto';
import { LoanEntity } from './loan.entity';

@ApiTags('Loan')
@Controller('loan')
export class LoanController {
  constructor(private service: LoanService) {}

  @ApiResponse({
    status: 200,
    description: 'recupera uma solicitação de empréstimo',
    type: LoanEntity,
  })
  @Get(':id')
  async getOne(@Param('id') id: string) {
    return await this.service.getOne(id);
  }

  @ApiResponse({
    status: 200,
    description: 'Todas as solicitações de empréstimo',
    type: Array<LoanEntity>,
  })
  @Get()
  async getAll() {
    return await this.service.getAll();
  }

  @ApiResponse({
    status: 200,
    description:
      'Todas as solicitações de empréstimo vinculadas a um funcionário por ID',
    type: Array<LoanEntity>,
  })
  @Get('employee/:id')
  async getByEmployee(@Param('id') id: string) {
    return await this.service.getByEmployee(id);
  }

  @ApiResponse({
    status: 200,
    description:
      'Todas as solicitações de empréstimo vinculadas a uma empresa por ID',
    type: Array<LoanEntity>,
  })
  @Get('company/:id')
  async getByCompany(@Param('id') id: string) {
    return await this.service.getByCompany(id);
  }

  @ApiResponse({
    status: 201,
    description: 'Cria uma solicitação de empréstimo',
    type: LoanEntity,
  })
  @Post()
  async create(@Body() data: LoanCreateDTO) {
    return await this.service.create(data);
  }

  @ApiResponse({
    status: 200,
    description: 'Atualiza os dados de uma solicitação de empréstimo por ID',
    type: LoanEntity,
  })
  @Put(':id')
  async update(@Param('id') id: string, @Body() data: LoanCreateDTO) {
    return await this.service.update(id, data);
  }

  @ApiResponse({
    status: 200,
    description: 'Apaga os dados de uma solicitação de empréstimo por ID',
  })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.service.remove(id);
  }
}
