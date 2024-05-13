import { Injectable } from '@nestjs/common';
import { UserCreateDTO } from './dto/userCreate.dto';
import { UserEntity } from './user.entity';
import { UserResponseDTO } from './dto/userResponse.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UserRepository {
  private users: UserEntity[] = [];

  async save(user: UserCreateDTO) {
    const newUser = new UserEntity();
    newUser.id = uuid();
    newUser.email = user.email;
    newUser.password = user.password;
    this.users.push(newUser);

    return { id: newUser.id };
  }

  async getAll() {
    return this.users.map((user) => {
      const newUser = new UserResponseDTO();
      newUser.id = user.id;
      newUser.username = user.username;
      return newUser;
    });
  }
}
