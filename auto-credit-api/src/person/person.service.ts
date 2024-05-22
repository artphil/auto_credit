import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PersonEntity } from './person.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PersonCreateDTO } from './dto/personCreate.dto';
import { validate } from 'uuid';
import { PersonResponseDTO } from './dto/personResponse.dto';

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(PersonEntity)
    private readonly repository: Repository<PersonEntity>,
  ) {}

  async getOne(id: string) {
    if (!validate(id)) throw new BadRequestException('ID inválido');

    const data = await this.repository.findOne({
      where: { id: id },
    });
    if (data === null) throw new NotFoundException('Pessoa não encontrada');

    return data;
  }

  async getAll() {
    const list = await this.repository.find();

    return list.map((person) => new PersonResponseDTO(person));
  }

  async getByUser(userId: string) {
    if (!validate(userId)) throw new BadRequestException('ID inválido');

    const data = await this.repository.findOne({
      relations: { user: true },
      where: { user: { id: userId } },
    });
    if (data === null) throw new NotFoundException('Pessoa não encontrada');

    return data;
  }

  async create(data: PersonCreateDTO) {
    const cpfOrUser = await this.repository.findOne({
      where: [{ cpf: data.cpf }, { user: { id: data.user.id } }],
    });
    if (cpfOrUser !== null) {
      if (cpfOrUser.cpf === data.cpf) {
        throw new BadRequestException('CPF já cadastrado');
      }
      if (data.user && cpfOrUser.user.id === data.user.id) {
        throw new BadRequestException('Usuário já possui cadastro');
      }
    }

    const newPerson = await this.repository.save(data);
    return new PersonResponseDTO(newPerson);
  }

  async update(id: string, data: PersonCreateDTO) {
    if (!validate(id)) throw new BadRequestException('ID inválido');

    const cpfOrUser = await this.repository.findOne({
      where: [{ cpf: data.cpf }, { user: { id: data.user.id } }],
    });
    if (cpfOrUser !== null && cpfOrUser.id !== id) {
      if (cpfOrUser.cpf === data.cpf) {
        throw new BadRequestException('CPF já cadastrado');
      }
      if (data.user && cpfOrUser.user.id === data.user.id) {
        throw new BadRequestException('Usuário já possui cadastro');
      }
    }

    const response = await this.repository.update(id, data);

    if (!response) throw new NotFoundException('Pessoa não encontrada');

    return response;
  }

  async remove(id: string) {
    if (!validate(id)) throw new BadRequestException('ID inválido');

    await this.getOne(id);
    await this.repository.delete(id);
  }
}
