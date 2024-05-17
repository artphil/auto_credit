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
    description: 'Lista de solicitações de empréstimo',
    type: Array<LoanEntity>,
  })
  @Get()
  async getAll() {
    return await this.service.getAll();
  }

  @ApiResponse({
    status: 200,
    description: 'Solicitação de empréstimo',
    type: LoanEntity,
  })
  @Get(':id')
  async getOne(@Param('id') id: string) {
    return await this.service.getOne(id);
  }

  @Get('employee/:id')
  async getByEmployee(@Param('id') id: string) {
    return await this.service.getByEmployee(id);
  }

  @Get('company/:id')
  async getByCompany(@Param('id') id: string) {
    return await this.service.getByCompany(id);
  }

  @ApiResponse({
    status: 201,
    description: 'Solicitação de empréstimo',
    type: LoanEntity,
  })
  @Post()
  async create(@Body() data: LoanCreateDTO) {
    return await this.service.create(data);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: LoanCreateDTO) {
    return await this.service.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.service.remove(id);
  }
}
