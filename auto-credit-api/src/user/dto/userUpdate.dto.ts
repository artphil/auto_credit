import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class UserUpdateDTO {
  @ApiPropertyOptional({
    description: 'Nome de usuário',
    example: 'Nepomuceno',
  })
  @IsNotEmpty({ message: 'Preencha um nome de usuário' })
  @IsOptional()
  username: string;

  @ApiPropertyOptional({ description: 'Email', example: 'nepo@email.com' })
  @IsEmail(undefined, { message: 'Email inválido' })
  @IsOptional()
  email: string;

  @ApiPropertyOptional({
    description: 'Senha: deve ter no mínimo 6 caracteres',
    example: '123456',
  })
  @MinLength(6, { message: 'A Senha deve ter no mínimo 6 caracteres' })
  @IsOptional()
  password: string;
}
