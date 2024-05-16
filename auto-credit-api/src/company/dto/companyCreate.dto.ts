import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { PersonEntity } from 'src/person/person.entity';

export class CompanyCreateDTO {
  @ApiProperty({ description: 'Razão social', example: 'Loja da Esquina' })
  @IsNotEmpty({ message: 'A razão social é obrigatória' })
  name: string;

  @ApiProperty({ description: 'CNPJ', example: '12345678000190' })
  @IsNotEmpty({ message: 'O CNPJ é obrigatório' })
  cnpj: string;

  @ApiPropertyOptional({
    description: 'Representante da empresa',
    example: { id: 'b7982992-dee4-43eb-b54e-ca48517d13b1' },
  })
  @IsOptional()
  representative: PersonEntity;
}
