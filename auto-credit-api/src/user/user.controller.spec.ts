import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { UserCreateDTO } from './dto/userCreate.dto';
import { UserUpdateDTO } from './dto/userUpdate.dto';
import { UserResponseDTO } from './dto/userResponse.dto';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';

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

const userCreateDTO: UserCreateDTO = {
  email: 'email@email.com',
  username: 'username',
  password: '123',
};

const userUpdateDTO: UserUpdateDTO = {
  email: 'email@email.com',
  username: 'username',
  password: '123',
};

const userResponseDTO: UserResponseDTO = {
  id: '5f59f128-148d-469b-9452-4613e6afd67c',
  username: 'username',
};

describe('UserController', () => {
  let controller: UserController;
  let repositoryMock: MockType<Repository<UserEntity>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    repositoryMock = module.get(getRepositoryToken(UserEntity));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should ID is not uuid', async () => {
    expect(controller.getOne('123456')).rejects.toEqual(
      new BadRequestException('ID inválido'),
    );
    expect(controller.update('123456', userUpdateDTO)).rejects.toEqual(
      new BadRequestException('ID inválido'),
    );
    expect(controller.remove('123456')).rejects.toEqual(
      new BadRequestException('ID inválido'),
    );
  });

  it('should find a user', async () => {
    repositoryMock.findOne.mockReturnValue(userEntity);
    expect(await controller.getOne(userEntity.id)).toEqual(userEntity);
  });

  it('should do not found a user', async () => {
    repositoryMock.findOne.mockReturnValue(null);
    await expect(controller.getOne(userEntity.id)).rejects.toEqual(
      new NotFoundException('Usuário não encontrado'),
    );
  });

  it('should find all users', async () => {
    const userList = [userResponseDTO, userResponseDTO];
    repositoryMock.find.mockReturnValue(userList);
    expect(await controller.getAll()).toEqual(userList);
  });

  it('should find no users', async () => {
    const userList = [];
    repositoryMock.find.mockReturnValue(userList);
    expect(await controller.getAll()).toEqual(userList);
  });

  it('should create user', async () => {
    repositoryMock.findOne.mockReturnValue(null);
    repositoryMock.save.mockReturnValue(userResponseDTO);
    expect(await controller.create(userCreateDTO)).toEqual(userResponseDTO);
  });

  it('should do not create user: email in use', async () => {
    repositoryMock.findOne.mockReturnValue(userEntity);
    repositoryMock.save.mockReturnValue(userResponseDTO);
    await expect(controller.create(userCreateDTO)).rejects.toEqual(
      new BadRequestException('Email já cadastrado'),
    );
  });

  it('should do not create user: username in use', async () => {
    const user = { ...userEntity, email: 'user@email.com' };
    repositoryMock.findOne.mockReturnValue(user);
    repositoryMock.save.mockReturnValue(userResponseDTO);
    await expect(controller.create(userCreateDTO)).rejects.toEqual(
      new BadRequestException('Usuário já cadastrado'),
    );
  });

  it('should update user', async () => {
    repositoryMock.findOne.mockReturnValue(userEntity);
    repositoryMock.update.mockReturnValue(userEntity);
    expect(await controller.update(userEntity.id, userUpdateDTO)).toEqual(
      userEntity,
    );
  });

  it('should do not update user: user not found', async () => {
    repositoryMock.findOne.mockReturnValue(null);
    repositoryMock.update.mockReturnValue(null);
    await expect(
      controller.update(userEntity.id, userUpdateDTO),
    ).rejects.toEqual(new NotFoundException('Usuário não encontrado'));
  });

  it('should do not update user: email in use', async () => {
    const user = { ...userEntity, id: '123' };
    repositoryMock.findOne.mockReturnValue(user);
    repositoryMock.update.mockReturnValue(userEntity);
    await expect(
      controller.update(userEntity.id, userUpdateDTO),
    ).rejects.toEqual(new BadRequestException('Email já cadastrado'));
  });

  it('should do not update user: username in use', async () => {
    const user = { ...userEntity, id: '123', email: 'user@email.com' };
    repositoryMock.findOne.mockReturnValue(user);
    repositoryMock.update.mockReturnValue(userEntity);
    await expect(
      controller.update(userEntity.id, userUpdateDTO),
    ).rejects.toEqual(new BadRequestException('Usuário já cadastrado'));
  });
});
