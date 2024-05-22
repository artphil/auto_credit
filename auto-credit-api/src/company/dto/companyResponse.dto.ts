import { ApiProperty } from '@nestjs/swagger';
import { CompanyEntity } from '../company.entity';

export class CompanyResponseDTO {
  @ApiProperty({
    description: 'Identificador único',
    example: 'b7982992-dee4-43eb-b54e-ca48517d13b1',
  })
  id: string;

  @ApiProperty({ description: 'Razão social', example: 'Loja da Esquina' })
  name: string;

  constructor(company: CompanyEntity) {
    this.id = company.id;
    this.name = company.name;
  }
}
