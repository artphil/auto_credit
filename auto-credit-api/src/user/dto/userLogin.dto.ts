import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UserLoginDTO {
  @ApiProperty({
    description: 'username ou email',
    example: 'nepo@email.com',
  })
  @IsNotEmpty({ message: 'Preencha um nome de usuário' })
  username: string;

  @ApiProperty({ description: 'Senha', example: '1234566' })
  @IsNotEmpty({ message: 'Preencha a senha' })
  password: string;
}
