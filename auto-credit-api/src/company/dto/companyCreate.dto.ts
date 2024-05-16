import { IsNotEmpty, IsOptional } from 'class-validator';
import { PersonEntity } from 'src/person/person.entity';

export class CompanyCreateDTO {
  @IsNotEmpty({ message: 'A razão social é obrigatória' })
  name: string;

  @IsNotEmpty({ message: 'O CNPJ é obrigatório' })
  cnpj: string;

  @IsOptional()
  representative: PersonEntity;
}
