import { CompanyResponseDTO } from './dto/companyResponse.dto';
import { CompanyCreateDTO } from './dto/companyCreate.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { CompanyService } from './company.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CompanyEntity } from './company.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { PersonEntity } from 'src/person/person.entity';
import { UserEntity } from 'src/user/user.entity';

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

const companyCreateDTO: CompanyCreateDTO = {
  cnpj: '646464646464',
  name: 'Satarlink',
  representative: personEntity,
};

const companyResponseDTO: CompanyResponseDTO = {
  id: '74b79561-f37c-41fb-980e-726fbcc9f8b5',
  name: 'Satarlink',
};

describe('CompanyService', () => {
  let service: CompanyService;
  let repositoryMock: MockType<Repository<CompanyEntity>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompanyService,
        {
          provide: getRepositoryToken(CompanyEntity),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<CompanyService>(CompanyService);
    repositoryMock = module.get(getRepositoryToken(CompanyEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should ID is not uuid', async () => {
    expect(service.getOne('123456')).rejects.toEqual(
      new BadRequestException('ID inválido'),
    );
    expect(service.getByPerson('123456')).rejects.toEqual(
      new BadRequestException('ID inválido'),
    );
    expect(service.update('123456', companyCreateDTO)).rejects.toEqual(
      new BadRequestException('ID inválido'),
    );
    expect(service.remove('123456')).rejects.toEqual(
      new BadRequestException('ID inválido'),
    );
  });

  it('should find a company', async () => {
    repositoryMock.findOne.mockReturnValue(companyEntity);
    expect(await service.getOne(companyEntity.id)).toEqual(companyEntity);
  });

  it('should do not found a company', async () => {
    repositoryMock.findOne.mockReturnValue(null);
    await expect(service.getOne(companyEntity.id)).rejects.toEqual(
      new NotFoundException('Empresa não encontrada'),
    );
  });

  it('should find all companys', async () => {
    const companyList = [companyResponseDTO, companyResponseDTO];
    repositoryMock.find.mockReturnValue(companyList);
    expect(await service.getAll()).toEqual(companyList);
  });

  it('should find no companys', async () => {
    const companyList = [];
    repositoryMock.find.mockReturnValue(companyList);
    expect(await service.getAll()).toEqual(companyList);
  });

  it('should create company', async () => {
    repositoryMock.findOne.mockReturnValue(null);
    repositoryMock.save.mockReturnValue(companyResponseDTO);
    expect(await service.create(companyCreateDTO)).toEqual(companyResponseDTO);
  });

  it('should do not create company: cnpj in use', async () => {
    repositoryMock.findOne.mockReturnValue(companyEntity);
    repositoryMock.save.mockReturnValue(companyResponseDTO);
    await expect(service.create(companyCreateDTO)).rejects.toEqual(
      new BadRequestException('CNPJ já cadastrado'),
    );
  });

  it('should do not create company: representative in use', async () => {
    const company: CompanyEntity = { ...companyEntity, cnpj: '32165498798' };
    repositoryMock.findOne.mockReturnValue(company);
    repositoryMock.save.mockReturnValue(companyResponseDTO);
    await expect(service.create(companyCreateDTO)).rejects.toEqual(
      new BadRequestException('Representante já cadastrado'),
    );
  });

  it('should update company', async () => {
    repositoryMock.findOne.mockReturnValue(companyEntity);
    repositoryMock.update.mockReturnValue(companyEntity);
    expect(await service.update(companyEntity.id, companyCreateDTO)).toEqual(
      companyEntity,
    );
  });

  it('should do not update company: company not found', async () => {
    repositoryMock.findOne.mockReturnValue(null);
    repositoryMock.update.mockReturnValue(null);
    await expect(
      service.update(companyEntity.id, companyCreateDTO),
    ).rejects.toEqual(new NotFoundException('Empresa não encontrada'));
  });

  it('should do not update company: cnpj in use', async () => {
    const company = { ...companyEntity, id: '123' };
    repositoryMock.findOne.mockReturnValue(company);
    repositoryMock.update.mockReturnValue(companyEntity);
    await expect(
      service.update(companyEntity.id, companyCreateDTO),
    ).rejects.toEqual(new BadRequestException('CNPJ já cadastrado'));
  });

  it('should do not update company: representative in use', async () => {
    const company = { ...companyEntity, id: '123', cnpj: '32165498798' };
    repositoryMock.findOne.mockReturnValue(company);
    repositoryMock.update.mockReturnValue(companyEntity);
    await expect(
      service.update(companyEntity.id, companyCreateDTO),
    ).rejects.toEqual(new BadRequestException('Representante já cadastrado'));
  });
});
