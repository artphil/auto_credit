import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { LoginController } from './login.controller';
import { UserLoginDTO } from './dto/userLogin.dto';

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<any>;
};

export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(
  () => ({
    findOne: jest.fn(),
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

const userLoginDTO: UserLoginDTO = {
  username: 'username',
  password: '123',
};

describe('LoginController', () => {
  let controller: LoginController;
  let repositoryMock: MockType<Repository<UserEntity>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoginController],
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    controller = module.get<LoginController>(LoginController);
    repositoryMock = module.get(getRepositoryToken(UserEntity));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should user login', async () => {
    repositoryMock.findOne.mockReturnValue(userEntity);
    expect(await controller.login(userLoginDTO)).toEqual(userEntity);
  });

  it('should user can not login: username wrong', async () => {
    const login: UserLoginDTO = { ...userLoginDTO, username: 'Teste' };
    repositoryMock.findOne.mockReturnValue(null);
    await expect(controller.login(login)).rejects.toEqual(
      new UnauthorizedException('Usuário inválido'),
    );
  });

  it('should user can not login: password wrong', async () => {
    const login: UserLoginDTO = { ...userLoginDTO, password: '123321' };
    repositoryMock.findOne.mockReturnValue(userEntity);
    await expect(controller.login(login)).rejects.toEqual(
      new UnauthorizedException('Usuário ou senha inválidos'),
    );
  });
});
