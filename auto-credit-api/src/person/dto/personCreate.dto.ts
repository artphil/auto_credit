import { IsNotEmpty, IsOptional } from 'class-validator';
import { UserEntity } from 'src/user/user.entity';

export class PersonCreateDTO {
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  name: string;

  @IsNotEmpty({ message: 'O CPF é obrigatório' })
  cpf: string;

  @IsOptional()
  user: UserEntity;
}
