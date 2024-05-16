import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmploymentEntity } from './employment.entity';
import { Repository } from 'typeorm';
import { validate } from 'uuid';
import { EmploymentResponseDTO } from './dto/employmentResponse.dto';
import { EmploymentCreateDTO } from './dto/employmentCreate.dto';

@Injectable()
export class EmploymentService {
  constructor(
    @InjectRepository(EmploymentEntity)
    private readonly repository: Repository<EmploymentEntity>,
  ) {}

  async getOne(id: string) {
    if (!validate(id)) throw new BadRequestException('ID inválido');

    const data = await this.repository.findOne({
      where: { id: id },
    });
    if (data === null)
      throw new NotFoundException('Relação de trabalho não encontrada');

    return data;
  }

  async getAll() {
    const list = await this.repository.find();

    return list.map((employment) => new EmploymentResponseDTO(employment));
  }

  async getByEmployee(employeeId: string) {
    if (!validate(employeeId)) throw new BadRequestException('ID inválido');

    const data = await this.repository.findOne({
      relations: { employee: true },
      where: { employee: { id: employeeId } },
    });
    if (data === null)
      throw new NotFoundException(
        'Relação de trabalho não encontrada para esse funcionário',
      );

    return data;
  }
  async getByCompany(companyId: string) {
    if (!validate(companyId)) throw new BadRequestException('ID inválido');

    return await this.repository.find({
      relations: { company: true },
      where: { company: { id: companyId } },
    });
  }

  async create(data: EmploymentCreateDTO) {
    const employment = await this.repository.findOne({
      relations: { employee: true },
      where: { employee: { id: data.employee.id } },
    });
    if (employment !== null) {
      throw new BadRequestException('Funcionário já possui cadastro');
    }

    const newEmployment = await this.repository.save(data);
    return new EmploymentResponseDTO(newEmployment);
  }

  async update(id: string, data: EmploymentCreateDTO) {
    if (!validate(id)) throw new BadRequestException('ID inválido');

    const employment = await this.repository.findOne({
      relations: { employee: true },
      where: { employee: { id: data.employee.id } },
    });
    if (employment !== null && employment.id !== id) {
      throw new BadRequestException('Funcionário já possui cadastro');
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
