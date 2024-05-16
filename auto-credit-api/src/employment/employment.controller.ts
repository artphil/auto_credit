import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EmploymentService } from './employment.service';
import { EmploymentCreateDTO } from './dto/employmentCreate.dto';

@ApiTags('Employment')
@Controller('employment')
export class EmploymentController {
  constructor(private service: EmploymentService) {}

  @Get()
  async getAll() {
    return await this.service.getAll();
  }

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

  @Post()
  async create(@Body() personData: EmploymentCreateDTO) {
    return await this.service.create(personData);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() personData: EmploymentCreateDTO,
  ) {
    return await this.service.update(id, personData);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.service.remove(id);
  }
}
