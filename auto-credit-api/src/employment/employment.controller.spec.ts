import { Test, TestingModule } from '@nestjs/testing';
import { EmploymentController } from './employment.controller';
import { Repository } from 'typeorm';
import { EmploymentService } from './employment.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { EmploymentEntity } from './employment.entity';

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

describe('EmploymentController', () => {
  let controller: EmploymentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmploymentController],
      providers: [
        EmploymentService,
        {
          provide: getRepositoryToken(EmploymentEntity),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    controller = module.get<EmploymentController>(EmploymentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
