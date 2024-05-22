import { EmploymentEntity } from './employment.entity';
import { EmploymentResponseDTO } from './dto/employmentResponse.dto';
import { EmploymentCreateDTO } from './dto/employmentCreate.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { EmploymentService } from './employment.service';
import { UserEntity } from 'src/user/user.entity';
import { PersonEntity } from 'src/person/person.entity';
import { CompanyEntity } from 'src/company/company.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CompanyResponseDTO } from 'src/company/dto/companyResponse.dto';
import { PersonResponseDTO } from 'src/person/dto/personResponse.dto';

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
  salary: 10000,
  createdAt: '',
  deletedAt: '',
  updatedAt: '',
  employee: personEntity,
  company: companyEntity,
};

const employmentCreateDTO: EmploymentCreateDTO = {
  salary: 10000,
  employee: personEntity,
  company: companyEntity,
};

const employmentResponseDTO: EmploymentResponseDTO = {
  id: 'aa6c822f-2a24-4b79-94f2-c5aba4489369',
  employee: new PersonResponseDTO(personEntity),
  company: new CompanyResponseDTO(companyEntity),
};

describe('EmploymentService', () => {
  let service: EmploymentService;
  let repositoryMock: MockType<Repository<EmploymentEntity>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmploymentService,
        {
          provide: getRepositoryToken(EmploymentEntity),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<EmploymentService>(EmploymentService);
    repositoryMock = module.get(getRepositoryToken(EmploymentEntity));
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
    expect(service.update('123456', employmentCreateDTO)).rejects.toEqual(
      new BadRequestException('ID inválido'),
    );
    expect(service.remove('123456')).rejects.toEqual(
      new BadRequestException('ID inválido'),
    );
  });

  it('should find a employment', async () => {
    repositoryMock.findOne.mockReturnValue(employmentEntity);
    expect(await service.getOne(employmentEntity.id)).toEqual(employmentEntity);
  });

  it('should do not found a employment', async () => {
    repositoryMock.findOne.mockReturnValue(null);
    await expect(service.getOne(employmentEntity.id)).rejects.toEqual(
      new NotFoundException('Relação de trabalho não encontrada'),
    );
  });

  it('should find all employments', async () => {
    const employmentList = [employmentResponseDTO, employmentResponseDTO];
    repositoryMock.find.mockReturnValue(employmentList);
    expect(await service.getAll()).toEqual(employmentList);
  });

  it('should find no employments', async () => {
    const employmentList = [];
    repositoryMock.find.mockReturnValue(employmentList);
    expect(await service.getAll()).toEqual(employmentList);
  });

  it('should create employment', async () => {
    repositoryMock.findOne.mockReturnValue(null);
    repositoryMock.save.mockReturnValue(employmentEntity);
    expect(await service.create(employmentCreateDTO)).toEqual(
      employmentResponseDTO,
    );
  });

  it('should do not create employment: employee in use', async () => {
    repositoryMock.findOne.mockReturnValue(employmentEntity);
    repositoryMock.save.mockReturnValue(employmentResponseDTO);
    await expect(service.create(employmentCreateDTO)).rejects.toEqual(
      new BadRequestException('Funcionário já possui cadastro'),
    );
  });

  it('should update employment', async () => {
    repositoryMock.findOne.mockReturnValue(employmentEntity);
    repositoryMock.update.mockReturnValue(employmentEntity);
    expect(
      await service.update(employmentEntity.id, employmentCreateDTO),
    ).toEqual(employmentEntity);
  });

  it('should do not update employment: employment not found', async () => {
    repositoryMock.findOne.mockReturnValue(null);
    repositoryMock.update.mockReturnValue(null);
    await expect(
      service.update(employmentEntity.id, employmentCreateDTO),
    ).rejects.toEqual(
      new NotFoundException('Relação de trabalho não encontrada'),
    );
  });

  it('should do not update employment: employee in use', async () => {
    const employment = { ...employmentEntity, id: '123' };
    repositoryMock.findOne.mockReturnValue(employment);
    repositoryMock.update.mockReturnValue(employmentEntity);
    await expect(
      service.update(employmentEntity.id, employmentCreateDTO),
    ).rejects.toEqual(
      new BadRequestException('Funcionário já possui cadastro'),
    );
  });
});
