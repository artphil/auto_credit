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

  async getbyUser(userId: string) {
    if (!validate(userId)) throw new BadRequestException('ID inválido');

    const data = await this.repository.findOne({
      relations: { user: true },
      where: { user: { id: userId } },
    });
    if (data === null) throw new NotFoundException('Pessoa não encontrada');

    return data;
  }

  async create(data: PersonCreateDTO) {
    const exists = await this.repository.findOne({
      where: { cpf: data.cpf },
    });
    if (exists !== null) {
      throw new BadRequestException('CPF já cadastrado');
    }
    return this.repository.save(data);
  }

  async update(id: string, userData: PersonCreateDTO) {
    if (!validate(id)) throw new BadRequestException('ID inválido');

    await this.repository.update(id, userData);
    return await this.getOne(id);
  }

  async remove(id: string) {
    if (!validate(id)) throw new BadRequestException('ID inválido');

    await this.getOne(id);
    await this.repository.delete(id);
  }
}
