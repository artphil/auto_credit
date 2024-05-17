import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoanController } from './loan.controller';
import { LoanService } from './loan.service';
import { ScoreService } from './score.service';
import { LoanEntity } from './loan.entity';
import { BankService } from './bank.service';

@Module({
  imports: [TypeOrmModule.forFeature([LoanEntity])],
  controllers: [LoanController],
  providers: [LoanService, ScoreService, BankService],
})
export class LoanModule {}
