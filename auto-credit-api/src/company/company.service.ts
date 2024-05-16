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
    const cnpj = await this.repository.findOne({
      where: { cnpj: data.cnpj },
    });
    if (cnpj !== null) {
      throw new BadRequestException('CNPJ já cadastrado');
    }
    if (data.representative) {
      const company = await this.repository.findOne({
        where: { representative: { id: data.representative.id } },
      });
      if (company !== null)
        throw new BadRequestException('Representante já cadastrado');
    }
    const newCompany = await this.repository.save(data);
    return new CompanyResponseDTO(newCompany);
  }

  async update(id: string, data: CompanyCreateDTO) {
    if (!validate(id)) throw new BadRequestException('ID inválido');

    if (data.representative) {
      const company = await this.repository.findOne({
        where: { representative: { id: data.representative.id } },
      });
      if (company !== null && company.id !== id)
        throw new BadRequestException('Representante já cadastrado');
    }

    await this.repository.update(id, data);
    return await this.getOne(id);
  }

  async remove(id: string) {
    if (!validate(id)) throw new BadRequestException('ID inválido');

    await this.getOne(id);
    await this.repository.delete(id);
  }
}
