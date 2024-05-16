import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class UserCreateDTO {
  @ApiProperty({ description: 'Nome de usuário', example: 'Nepomuceno' })
  @IsNotEmpty({ message: 'Preencha um nome de usuário' })
  username: string;

  @ApiProperty({ description: 'Email', example: 'nepo@email.com' })
  @IsEmail(undefined, { message: 'Email inválido' })
  email: string;

  @ApiProperty({
    description: 'Senha: deve ter no mínimo 6 caracteres',
    example: '123456',
  })
  @MinLength(6, { message: 'A Senha deve ter no mínimo 6 caracteres' })
  password: string;
}
