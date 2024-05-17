import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConfigService } from 'src/config/postgres.config.service';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from 'src/user/user.module';
import { PersonModule } from 'src/person/person.module';
import { CompanyModule } from 'src/company/company.module';
import { EmploymentModule } from 'src/employment/employment.module';
import { LoanModule } from 'src/loan/loan.module';

@Module({
  imports: [
    UserModule,
    PersonModule,
    CompanyModule,
    EmploymentModule,
    LoanModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfigService,
      inject: [PostgresConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
