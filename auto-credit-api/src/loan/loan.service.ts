import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { validate } from 'uuid';
import { LoanEntity } from './loan.entity';
import { LoanCreateDTO } from './dto/loanCreate.dto';
import { ScoreService } from './score.service';
import { SALARY_PER_CENT } from './loan.type';
import { BankService } from './bank.service';

@Injectable()
export class LoanService {
  constructor(
    @InjectRepository(LoanEntity)
    private readonly repository: Repository<LoanEntity>,
    private readonly scoreService: ScoreService,
    private readonly bankService: BankService,
  ) {}

  async getOne(id: string) {
    if (!validate(id)) throw new BadRequestException('ID inválido');

    const data = await this.repository.findOne({
      where: { id: id },
      loadEagerRelations: false,
      loadRelationIds: true,
    });
    if (data === null)
      throw new NotFoundException('Solicitação não encontrada');

    return data;
  }

  async getAll() {
    const list = await this.repository.find();

    return list;
  }

  async getByEmployee(employeeId: string) {
    if (!validate(employeeId)) throw new BadRequestException('ID inválido');

    const data = await this.repository.findOne({
      relations: { employee: true },
      where: { employee: { id: employeeId } },
      loadEagerRelations: false,
      loadRelationIds: true,
    });
    if (data === null)
      throw new NotFoundException(
        'Solicitação não encontrada para esse funcionário',
      );

    return data;
  }

  async getByCompany(companyId: string) {
    if (!validate(companyId)) throw new BadRequestException('ID inválido');

    return await this.repository.find({
      relations: { company: true },
      where: { company: { id: companyId } },
      loadEagerRelations: false,
      loadRelationIds: true,
    });
  }

  async create(data: LoanCreateDTO) {
    const loan = new LoanEntity();
    loan.employment = data.employment;
    loan.company = data.company;
    loan.employee = data.employee;
    loan.salary = data.salary;
    loan.amount = data.amount;
    loan.times = data.times;
    loan.status = 'Aguardando';

    const response = await this.repository.save(loan);
    this.checkLoan(response.id);

    return response;
  }

  async checkLoan(loanId: string) {
    const loan = await this.repository.findOne({
      where: { id: loanId },
    });
    if (
      loan.company.id !== loan.employment.company.id ||
      loan.employee.id !== loan.employment.employee.id
    ) {
      loan.status = 'Recusado';
      loan.description = 'Relação de trabalho inválida';
      this.repository.save(loan);
      return;
    }

    const installmentMax = loan.salary * SALARY_PER_CENT;
    const installment = loan.amount / loan.times;
    if (installment > installmentMax) {
      loan.status = 'Recusado';
      loan.description = `Parcela não pode ser superior a ${SALARY_PER_CENT * 100}% do salário`;
      this.repository.save(loan);
      return;
    }

    const scoreMin = this.scoreBySalary(loan.salary);
    const score = await this.scoreService.getScore(loan.employee.cpf);
    loan.score = score.score;
    if (loan.score < scoreMin) {
      loan.status = 'Recusado';
      loan.description = `Score insuficiente`;
      this.repository.save(loan);
      return;
    }

    loan.status = 'Aprovado';
    loan.description = `Solicitação aprovada`;
    this.repository.save(loan);
    this.depositLoan(loanId);
  }

  scoreBySalary(salary: number) {
    if (salary <= 2000) {
      return 400;
    } else if (salary <= 4000) {
      return 500;
    } else if (salary <= 8000) {
      return 600;
    } else if (salary <= 12000) {
      return 700;
    }
  }

  async depositLoan(loanId: string) {
    const response = await this.bankService.deposit();
    if (response?.ok) {
      const loan = await this.repository.findOne({
        where: { id: loanId },
        loadEagerRelations: false,
      });
      loan.deposit = true;
      this.repository.save(loan);
    } else {
      this.depositLoan(loanId);
    }
  }

  async update(id: string, data: LoanCreateDTO) {
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
