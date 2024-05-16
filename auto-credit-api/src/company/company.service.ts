import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyEntity } from './company.entity';
import { Repository } from 'typeorm';
import { validate } from 'uuid';
import { CompanyCreateDTO } from './dto/companyCreate.dto';
import { CompanyResponseDTO } from './dto/companyResponse.dto';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(CompanyEntity)
    private readonly repository: Repository<CompanyEntity>,
  ) {}

  async getOne(id: string) {
    if (!validate(id)) throw new BadRequestException('ID inválido');

    const data = await this.repository.findOne({
      where: { id: id },
    });
    if (data === null) throw new NotFoundException('Empresa não encontrada');

    return data;
  }

  async getAll() {
    const list = await this.repository.find();

    return list.map((company) => new CompanyResponseDTO(company));
  }

  async getbyPerson(userId: string) {
    if (!validate(userId)) throw new BadRequestException('ID inválido');

    const data = await this.repository.findOne({
      relations: { representative: true },
      where: { representative: { id: userId } },
    });
    if (data === null) throw new NotFoundException('Empresa não encontrada');

    return data;
  }

  async create(data: CompanyCreateDTO) {
    const exists = await this.repository.findOne({
      where: { cnpj: data.cnpj },
    });
    if (exists !== null) {
      throw new BadRequestException('CNPJ já cadastrado');
    }
    const newCompany = await this.repository.save(data);
    return new CompanyResponseDTO(newCompany);
  }

  async update(id: string, userData: CompanyCreateDTO) {
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
