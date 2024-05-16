import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CompanyEntity } from 'src/company/company.entity';
import { PersonEntity } from 'src/person/person.entity';

export class EmploymentCreateDTO {
  @ApiProperty({
    description: 'Funcioário',
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
    example: '1000,26',
  })
  @IsNotEmpty({ message: 'O salário é obrigatório' })
  salary: number;
}
