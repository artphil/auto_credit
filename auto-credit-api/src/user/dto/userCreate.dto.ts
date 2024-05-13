import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class UserCreateDTO {
  @IsNotEmpty({ message: 'Preencha um nome de usuário' })
  username: string;

  @IsEmail(undefined, { message: 'Email inválido' })
  email: string;

  @MinLength(6, { message: 'A Senha deve ter no mínimo 6 caracteres' })
  password: string;
}
