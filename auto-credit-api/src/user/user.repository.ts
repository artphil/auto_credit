import { Injectable } from '@nestjs/common';
import { UserModel } from './user.model';

@Injectable()
export class UserRepository {
  private users: UserModel[] = [];

  async save(user: UserModel) {
    this.users.push(user);
    const newUser = new UserModel();
    newUser.id = this.users.length - 1;
    newUser.email = user.email;
    newUser.password = user.password;
    return newUser;
  }

  async getAll() {
    return this.users.map((user, index) => {
      const newUser = new UserModel();
      newUser.id = index;
      newUser.email = user.email;
      return newUser;
    });
  }
}
