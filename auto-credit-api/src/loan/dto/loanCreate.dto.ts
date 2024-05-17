import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CompanyEntity } from 'src/company/company.entity';
import { EmploymentEntity } from 'src/employment/employment.entity';
import { PersonEntity } from 'src/person/person.entity';

export class LoanCreateDTO {
  @ApiProperty({
    description: 'Realação de tarbalho',
    example: { id: 'b7982992-dee4-43eb-b54e-ca48517d13b1' },
  })
  @IsNotEmpty({ message: 'A relação de tarbalho é obrigatória' })
  employment: EmploymentEntity;

  @ApiProperty({
    description: 'Realação de tarbalho',
    example: { id: 'b7982992-dee4-43eb-b54e-ca48517d13b1' },
  })
  @IsNotEmpty({ message: 'O funcionário é obrigatório' })
  employee: PersonEntity;

  @ApiProperty({
    description: 'Empresa',
    example: { id: 'b7982992-dee4-43eb-b54e-ca48517d13b1' },
  })
  @IsNotEmpty({ message: 'A empresa é obrigatória' })
  company: CompanyEntity;

  @ApiProperty({
    description: 'Salário',
    example: 1000.26,
  })
  @IsNotEmpty({ message: 'O salário é obrigatório' })
  salary: number;

  @ApiProperty({
    description: 'Valor do empréstimo solicitado pelo fucionário',
    example: 12500.0,
  })
  @IsNotEmpty({ message: 'O valor do empréstimo é obrigatório' })
  amount: number;

  @ApiProperty({
    description: 'Quantidade de parcelas para pagamento da dívida',
    example: 3,
  })
  @IsNotEmpty({ message: 'A quantidade de parcelas é obrigatória' })
  times: number;
}
