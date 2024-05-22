import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../user.entity';

export class UserResponseDTO {
  @ApiProperty({
    description: 'Identificador único',
    example: 'b7982992-dee4-43eb-b54e-ca48517d13b1',
  })
  id: string;

  @ApiProperty({ description: 'Nome de usuário', example: 'Nepomuceno' })
  username: string;

  constructor(user: UserEntity) {
    this.id = user.id;
    this.username = user.username;
  }
}
