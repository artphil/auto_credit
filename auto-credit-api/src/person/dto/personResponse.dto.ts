import { ApiProperty } from '@nestjs/swagger';
import { PersonEntity } from '../person.entity';

export class PersonResponseDTO {
  @ApiProperty({
    description: 'Identificador único',
    example: 'b7982992-dee4-43eb-b54e-ca48517d13b1',
  })
  id: string;

  @ApiProperty({
    description: 'Nome completo',
    example: 'Nepomuceno de Aguilar',
  })
  name: string;

  constructor(person: PersonEntity) {
    this.id = person.id;
    this.name = person.name;
  }
}
