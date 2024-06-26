import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiResponse({
    status: 200,
    description: 'Saúde da aplicação',
    content: { 200: { example: 'API - status OK!' } },
  })
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
