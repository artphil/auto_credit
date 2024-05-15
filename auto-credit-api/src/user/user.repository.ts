import {
  NotFoundException,
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { UserEntity } from './user.entity';
import { UserCreateDTO } from './dto/userCreate.dto';
import { UserResponseDTO } from './dto/userResponse.dto';
import { UserUpdateDTO } from './dto/userUpdate.dto';

@Injectable()
export class UserRepository {
  private users: UserEntity[] = [];

  private createResponse(user: UserEntity) {
    const response = new UserResponseDTO();
    response.id = user.id;
    response.username = user.username;
    return response;
  }

  async create(userData: UserCreateDTO) {
    const userExist = this.users.find((user) => user.email === userData.email);

    if (userExist) throw new BadRequestException('Email já cadastrado');

    const newUser = new UserEntity();
    newUser.id = uuid();
    newUser.email = userData.email;
    newUser.password = userData.password;
    this.users.push(newUser);

    return { id: newUser.id };
  }

  async get(id: string) {
    const userData = this.users.find((user) => user.id === id);

    if (!userData) throw new NotFoundException('Usuário não encontrado');

    return userData;
  }

  async getAll() {
    return this.users.map((user) => {
      return this.createResponse(user);
    });
  }

  async update(id: string, userData: UserUpdateDTO) {
    const userToUpdate = await this.get(id);

    Object.entries(userData).forEach(([key, value]) => {
      if (key === 'id') return;
      userToUpdate[key] = value;
    });

    return this.createResponse(userToUpdate);
  }

  async remove(id: string) {
    const userToRemove = await this.get(id);
    this.users = this.users.filter((user) => user.id !== id);
    return this.createResponse(userToRemove);
  }
}
