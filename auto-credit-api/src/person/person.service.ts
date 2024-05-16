import { Injectable, NotFoundException } from '@nestjs/common';
import { PersonEntity } from './person.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PersonCreateDTO } from './dto/personCreate.dto';

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(PersonEntity)
    private readonly personRepository: Repository<PersonEntity>,
  ) {}

  async getOne(id: string) {
    const personData = await this.personRepository.findOne({
      where: { id: id },
    });
    if (personData === null)
      throw new NotFoundException('Usuário não encontrado');

    return personData;
  }

  async getbyUser(userId: string) {
    const personData = await this.personRepository.findOne({
      relations: { user: true },
      where: { user: { id: userId } },
    });
    if (personData === null)
      throw new NotFoundException('Usuário não encontrado');

    return personData;
  }

  async create(personData: PersonCreateDTO) {
    return this.personRepository.save(personData);
  }

  async update(id: string, userData: PersonCreateDTO) {
    await this.personRepository.update(id, userData);
    return await this.getOne(id);
  }

  async remove(id: string) {
    await this.getOne(id);
    await this.personRepository.delete(id);
  }
}
