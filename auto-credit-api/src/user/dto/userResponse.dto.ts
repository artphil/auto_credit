import { UserEntity } from '../user.entity';

export class UserResponseDTO {
  id: string;
  username: string;

  constructor(user: UserEntity) {
    this.id = user.id;
    this.username = user.username;
  }
}
