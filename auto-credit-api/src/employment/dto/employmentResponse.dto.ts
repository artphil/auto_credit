import { EmploymentEntity } from '../employment.entity';
import { PersonResponseDTO } from 'src/person/dto/personResponse.dto';
import { CompanyResponseDTO } from 'src/company/dto/companyResponse.dto';
import { ApiProperty } from '@nestjs/swagger';

export class EmploymentResponseDTO {
  @ApiProperty({
    description: 'Identificador único',
    example: 'b7982992-dee4-43eb-b54e-ca48517d13b1',
  })
  id: string;

  @ApiProperty({
    description: 'Funcionário',
    example: { id: 'b7982992-dee4-43eb-b54e-ca48517d13b1' },
  })
  employee: PersonResponseDTO;

  @ApiProperty({
    description: 'Empresa',
    example: { id: 'b7982992-dee4-43eb-b54e-ca48517d13b1' },
  })
  company: CompanyResponseDTO;

  constructor(employment: EmploymentEntity) {
    this.id = employment.id;
    this.employee = new PersonResponseDTO(employment.employee);
    this.company = new CompanyResponseDTO(employment.company);
  }
}
