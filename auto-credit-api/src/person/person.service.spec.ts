import { PersonCreateDTO } from './dto/personCreate.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { PersonService } from './person.service';
import { Repository } from 'typeorm';
import { PersonEntity } from './person.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { UserEntity } from 'src/user/user.entity';
import { PersonResponseDTO } from './dto/personResponse.dto';

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

const personCreateDTO: PersonCreateDTO = {
  name: 'Joca',
  cpf: '12345678910',
  user: userEntity,
};

const personResponseDTO: PersonResponseDTO = {
  id: '74b79561-f37c-41fb-980e-726fbcc9f8b5',
  name: 'Joca',
};

describe('PersonService', () => {
  let service: PersonService;
  let repositoryMock: MockType<Repository<PersonEntity>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PersonService,
        {
          provide: getRepositoryToken(PersonEntity),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<PersonService>(PersonService);
    repositoryMock = module.get(getRepositoryToken(PersonEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should ID is not uuid', async () => {
    expect(service.getOne('123456')).rejects.toEqual(
      new BadRequestException('ID inválido'),
    );
    expect(service.getByUser('123456')).rejects.toEqual(
      new BadRequestException('ID inválido'),
    );
    expect(service.update('123456', personCreateDTO)).rejects.toEqual(
      new BadRequestException('ID inválido'),
    );
    expect(service.remove('123456')).rejects.toEqual(
      new BadRequestException('ID inválido'),
    );
  });

  it('should find a person', async () => {
    repositoryMock.findOne.mockReturnValue(personEntity);
    expect(await service.getOne(personEntity.id)).toEqual(personEntity);
  });

  it('should do not found a person', async () => {
    repositoryMock.findOne.mockReturnValue(null);
    await expect(service.getOne(personEntity.id)).rejects.toEqual(
      new NotFoundException('Pessoa não encontrada'),
    );
  });

  it('should find all persons', async () => {
    const personList = [personResponseDTO, personResponseDTO];
    repositoryMock.find.mockReturnValue(personList);
    expect(await service.getAll()).toEqual(personList);
  });

  it('should find no persons', async () => {
    const personList = [];
    repositoryMock.find.mockReturnValue(personList);
    expect(await service.getAll()).toEqual(personList);
  });

  it('should create person', async () => {
    repositoryMock.findOne.mockReturnValue(null);
    repositoryMock.save.mockReturnValue(personResponseDTO);
    expect(await service.create(personCreateDTO)).toEqual(personResponseDTO);
  });

  it('should do not create person: cpf in use', async () => {
    repositoryMock.findOne.mockReturnValue(personEntity);
    repositoryMock.save.mockReturnValue(personResponseDTO);
    await expect(service.create(personCreateDTO)).rejects.toEqual(
      new BadRequestException('CPF já cadastrado'),
    );
  });

  it('should do not create person: user has data', async () => {
    const person: PersonEntity = { ...personEntity, cpf: '32165498798' };
    repositoryMock.findOne.mockReturnValue(person);
    repositoryMock.save.mockReturnValue(personResponseDTO);
    await expect(service.create(personCreateDTO)).rejects.toEqual(
      new BadRequestException('Usuário já possui cadastro'),
    );
  });

  it('should update person', async () => {
    repositoryMock.findOne.mockReturnValue(personEntity);
    repositoryMock.update.mockReturnValue(personEntity);
    expect(await service.update(personEntity.id, personCreateDTO)).toEqual(
      personEntity,
    );
  });

  it('should do not update person: person not found', async () => {
    repositoryMock.findOne.mockReturnValue(null);
    repositoryMock.update.mockReturnValue(null);
    await expect(
      service.update(personEntity.id, personCreateDTO),
    ).rejects.toEqual(new NotFoundException('Pessoa não encontrada'));
  });

  it('should do not update person: cpf in use', async () => {
    const person = { ...personEntity, id: '123' };
    repositoryMock.findOne.mockReturnValue(person);
    repositoryMock.update.mockReturnValue(personEntity);
    await expect(
      service.update(personEntity.id, personCreateDTO),
    ).rejects.toEqual(new BadRequestException('CPF já cadastrado'));
  });

  it('should do not update person: user in use', async () => {
    const person = { ...personEntity, id: '123', cpf: '32165498798' };
    repositoryMock.findOne.mockReturnValue(person);
    repositoryMock.update.mockReturnValue(personEntity);
    await expect(
      service.update(personEntity.id, personCreateDTO),
    ).rejects.toEqual(new BadRequestException('Usuário já possui cadastro'));
  });
});
