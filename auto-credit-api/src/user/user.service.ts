import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { UserResponseDTO } from './dto/userResponse.dto';
import { UserCreateDTO } from './dto/userCreate.dto';
import { UserUpdateDTO } from './dto/userUpdate.dto';
import { validate } from 'uuid';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}

  async getOne(id: string) {
    if (!validate(id)) throw new BadRequestException('ID inválido');

    const data = await this.repository.findOne({
      where: { id: id },
    });
    if (data === null) throw new NotFoundException('Usuário não encontrado');

    return data;
  }

  async getAll() {
    const userlist = await this.repository.find();
    return userlist.map((user) => new UserResponseDTO(user.id, user.username));
  }

  async create(data: UserCreateDTO) {
    const exists = await this.repository.findOne({
      where: [{ email: data.email }, { username: data.username }],
    });
    if (exists !== null) {
      if (exists.email === data.email)
        throw new BadRequestException('Email já cadastrado');
      if (exists.username === data.username)
        throw new BadRequestException('Usuário já cadastrado');
    }

    const newUser = await this.repository.save(data);

    return new UserResponseDTO(newUser.id, newUser.username);
  }

  async update(id: string, data: UserUpdateDTO) {
    if (!validate(id)) throw new BadRequestException('ID inválido');

    await this.repository.update(id, data);
    return await this.getOne(id);
  }

  async remove(id: string) {
    if (!validate(id)) throw new BadRequestException('ID inválido');

    await this.getOne(id);
    await this.repository.delete(id);
  }
}
