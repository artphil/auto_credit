import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { UserEntity } from 'src/user/user.entity';

export class PersonCreateDTO {
  @ApiProperty({
    description: 'Nome completo',
    example: 'Nepomuceno de Aguilar',
  })
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  name: string;

  @ApiProperty({ description: 'CPF', example: '1235467910' })
  @IsNotEmpty({ message: 'O CPF é obrigatório' })
  cpf: string;

  @ApiPropertyOptional({
    description: 'Usuário vinculado',
    example: '{ id: b7982992-dee4-43eb-b54e-ca48517d13b1 }',
  })
  @IsOptional()
  user: UserEntity;
}
