import { Test, TestingModule } from '@nestjs/testing';
import { LoanController } from './loan.controller';
import { Repository } from 'typeorm';
import { BankService } from './bank.service';
import { ScoreService } from './score.service';
import { LoanService } from './loan.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { LoanEntity } from './loan.entity';

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

describe('LoanController', () => {
  let controller: LoanController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoanController],
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

    controller = module.get<LoanController>(LoanController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
