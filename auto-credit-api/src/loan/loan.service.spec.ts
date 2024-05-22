import { Test, TestingModule } from '@nestjs/testing';
import { LoanService } from './loan.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { LoanEntity } from './loan.entity';
import { ScoreService } from './score.service';
import { BankService } from './bank.service';
import { UserEntity } from 'src/user/user.entity';
import { PersonEntity } from 'src/person/person.entity';
import { CompanyEntity } from 'src/company/company.entity';
import { EmploymentEntity } from 'src/employment/employment.entity';
import { LoanCreateDTO } from './dto/loanCreate.dto';
import { BadRequestException, NotFoundException } from '@nestjs/common';

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<any>;
};

export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(
  () => ({
    findOne: jest.fn(),
    find: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  }),
);

export const bankMockFactory: () => MockType<BankService> = jest.fn(() => ({
  deposit: jest.fn(),
}));

export const scoreMockFactory: () => MockType<ScoreService> = jest.fn(() => ({
  getScore: jest.fn(),
}));

const userEntity: UserEntity = {
  id: '5f59f128-148d-469b-9452-4613e6afd67c',
  email: 'email@email.com',
  username: 'username',
  password: '123',
  createdAt: '',
  deletedAt: '',
  updatedAt: '',
};

const personEntity: PersonEntity = {
  id: '74b79561-f37c-41fb-980e-726fbcc9f8b5',
  name: 'Joca',
  cpf: '12345678910',
  createdAt: '',
  deletedAt: '',
  updatedAt: '',
  user: userEntity,
};

const companyEntity: CompanyEntity = {
  id: 'b7982992-dee4-43eb-b54e-ca48517d13b1',
  cnpj: '646464646464',
  name: 'Satarlink',
  createdAt: '',
  deletedAt: '',
  updatedAt: '',
  representative: personEntity,
};

const employmentEntity: EmploymentEntity = {
  id: 'aa6c822f-2a24-4b79-94f2-c5aba4489369',
  salary: 5000,
  createdAt: '',
  deletedAt: '',
  updatedAt: '',
  employee: personEntity,
  company: companyEntity,
};

const loanEntity: LoanEntity = {
  id: '3d3062e5-9ead-47aa-b457-6c0c3f42e72a',
  description: 'Recusado',
  status: 'Aguardando',
  date: new Date(),
  deposit: false,
  salary: 5000,
  amount: 6000,
  times: 4,
  score: 0,
  createdAt: '',
  deletedAt: '',
  updatedAt: '',
  employment: employmentEntity,
  employee: personEntity,
  company: companyEntity,
};

const loanCreateDTO: LoanCreateDTO = {
  employment: employmentEntity,
  employee: personEntity,
  company: companyEntity,
  salary: 5000,
  amount: 6000,
  times: 4,
};

describe('LoanService', () => {
  let service: LoanService;
  let repositoryMock: MockType<Repository<LoanEntity>>;
  let bankMock: MockType<BankService>;
  let scoreMock: MockType<ScoreService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoanService,
        {
          provide: getRepositoryToken(LoanEntity),
          useFactory: repositoryMockFactory,
        },
        {
          provide: BankService,
          useFactory: bankMockFactory,
        },
        {
          provide: ScoreService,
          useFactory: scoreMockFactory,
        },
      ],
    }).compile();

    service = module.get<LoanService>(LoanService);
    repositoryMock = module.get(getRepositoryToken(LoanEntity));
    bankMock = module.get(BankService);
    scoreMock = module.get(ScoreService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should ID is not uuid', async () => {
    expect(service.getOne('123456')).rejects.toEqual(
      new BadRequestException('ID inválido'),
    );
    expect(service.getByEmployee('123456')).rejects.toEqual(
      new BadRequestException('ID inválido'),
    );
    expect(service.getByCompany('123456')).rejects.toEqual(
      new BadRequestException('ID inválido'),
    );
    expect(service.update('123456', loanCreateDTO)).rejects.toEqual(
      new BadRequestException('ID inválido'),
    );
    expect(service.remove('123456')).rejects.toEqual(
      new BadRequestException('ID inválido'),
    );
  });

  it('should find a loan', async () => {
    repositoryMock.findOne.mockReturnValue(loanEntity);
    expect(await service.getOne(loanEntity.id)).toEqual(loanEntity);
  });

  it('should do not found a loan', async () => {
    repositoryMock.findOne.mockReturnValue(null);
    await expect(service.getOne(loanEntity.id)).rejects.toEqual(
      new NotFoundException('Solicitação não encontrada'),
    );
  });

  it('should find all loans', async () => {
    const personList = [loanEntity, loanEntity];
    repositoryMock.find.mockReturnValue(personList);
    expect(await service.getAll()).toEqual(personList);
  });

  it('should find no loans', async () => {
    const personList = [];
    repositoryMock.find.mockReturnValue(personList);
    expect(await service.getAll()).toEqual(personList);
  });

  it('should find all loans by Employee', async () => {
    const personList = [loanEntity, loanEntity];
    repositoryMock.find.mockReturnValue(personList);
    expect(await service.getByEmployee(personEntity.id)).toEqual(personList);
  });

  it('should find no loans by Employee', async () => {
    const personList = [];
    repositoryMock.find.mockReturnValue(personList);
    expect(await service.getByEmployee(personEntity.id)).toEqual(personList);
  });

  it('should find all loans by Company', async () => {
    const personList = [loanEntity, loanEntity];
    repositoryMock.find.mockReturnValue(personList);
    expect(await service.getByCompany(personEntity.id)).toEqual(personList);
  });

  it('should find no loans by Company', async () => {
    const personList = [];
    repositoryMock.find.mockReturnValue(personList);
    expect(await service.getByCompany(personEntity.id)).toEqual(personList);
  });

  it('should create loan', async () => {
    repositoryMock.findOne.mockReturnValue(loanEntity);
    repositoryMock.save.mockReturnValue(loanEntity);
    scoreMock.getScore.mockReturnValue({ score: 650 });
    bankMock.deposit.mockReturnValue(true);
    expect(await service.create(loanCreateDTO)).toEqual(loanEntity);
  });

  it('should update loan', async () => {
    repositoryMock.findOne.mockReturnValue(loanEntity);
    repositoryMock.update.mockReturnValue(loanEntity);
    expect(await service.update(loanEntity.id, loanCreateDTO)).toEqual(
      loanEntity,
    );
  });

  it('should do not update loan: loan not found', async () => {
    repositoryMock.findOne.mockReturnValue(null);
    repositoryMock.update.mockReturnValue(null);
    await expect(service.update(loanEntity.id, loanCreateDTO)).rejects.toEqual(
      new NotFoundException('Solicitação não encontrada'),
    );
  });

  it('should loan score', () => {
    expect(service.scoreBySalary(0)).toEqual(400);
    expect(service.scoreBySalary(2000)).toEqual(400);
    expect(service.scoreBySalary(2000.01)).toEqual(500);
    expect(service.scoreBySalary(4000)).toEqual(500);
    expect(service.scoreBySalary(4000.01)).toEqual(600);
    expect(service.scoreBySalary(8000)).toEqual(600);
    expect(service.scoreBySalary(8000.01)).toEqual(700);
    expect(service.scoreBySalary(12000)).toEqual(700);
    expect(service.scoreBySalary(12000.01)).toEqual(900);
  });
});
