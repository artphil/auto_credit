import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class UserUpdateDTO {
  @IsNotEmpty({ message: 'Preencha um nome de usuário' })
  @IsOptional()
  username: string;

  @IsEmail(undefined, { message: 'Email inválido' })
  @IsOptional()
  email: string;

  @MinLength(6, { message: 'A Senha deve ter no mínimo 6 caracteres' })
  @IsOptional()
  password: string;
}
