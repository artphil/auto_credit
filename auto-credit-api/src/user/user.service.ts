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

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getOne(id: string) {
    const userData = await this.userRepository.findOne({
      select: { password: false },
      where: { id: id },
    });
    if (userData === null)
      throw new NotFoundException('Usuário não encontrado');

    return userData;
  }

  async getAll() {
    const userlist = await this.userRepository.find();
    return userlist.map((user) => new UserResponseDTO(user.id, user.username));
  }

  async create(userData: UserCreateDTO) {
    const userExist = await this.userRepository.findOne({
      where: [{ email: userData.email }, { username: userData.username }],
    });
    if (userExist !== null) {
      if (userExist.email === userData.email)
        throw new BadRequestException('Email já cadastrado');
      if (userExist.username === userData.username)
        throw new BadRequestException('Usuário já cadastrado');
    }

    const newUser = await this.userRepository.save(userData);

    return new UserResponseDTO(newUser.id, newUser.username);
  }

  async update(id: string, userData: UserUpdateDTO) {
    await this.userRepository.update(id, userData);
    return await this.getOne(id);
  }

  async remove(id: string) {
    await this.getOne(id);
    await this.userRepository.delete(id);
  }
}
