import { PersonCreateDTO } from './dto/personCreate.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { PersonService } from './person.service';
import { Repository } from 'typeorm';
import { PersonEntity } from './person.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BadRequestException } from '@nestjs/common';
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

const personCreateDTO: PersonCreateDTO = {
  name: 'Joca',
  cpf: '12345678910',
  user: userEntity,
};

describe('PersonService', () => {
  let service: PersonService;
  let repositoryMock: MockType<Repository<PersonEntity>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PersonService,
        {
          provide: getRepositoryToken(PersonService),
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
});
