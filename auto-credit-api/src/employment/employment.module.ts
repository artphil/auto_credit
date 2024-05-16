import { Module } from '@nestjs/common';
import { EmploymentService } from './employment.service';
import { EmploymentController } from './employment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmploymentEntity } from './employment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EmploymentEntity])],
  providers: [EmploymentService],
  controllers: [EmploymentController],
})
export class EmploymentModule {}
