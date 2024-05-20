import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { PersonEntity } from 'src/person/person.entity';
import { CompanyEntity } from 'src/company/company.entity';
import { LoanStatusType } from './loan.type';
import { EmploymentEntity } from 'src/employment/employment.entity';

@Entity({ name: 'loans' })
export class LoanEntity {
  @ApiProperty({
    description: 'Identificador único',
    example: 'b7982992-dee4-43eb-b54e-ca48517d13b1',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Estado da solicitação de empréstimo',
    example: 'Aprovado',
  })
  @Column({ name: 'status', nullable: false })
  status: LoanStatusType;

  @ApiProperty({
    description: 'date da solicitação de empréstimo',
    example: '2024-12-21',
  })
  @Column({ name: 'date', nullable: false })
  date: Date;

  @ApiProperty({
    description: 'Descrição do Estado',
    example: 'Reprovado por score baixo',
  })
  @Column({ name: 'description', nullable: true })
  description: string;

  @ApiProperty({
    description: 'Salário do fucionário na data da solicitação',
    example: 2500.56,
  })
  @Column({
    name: 'salary',
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
  })
  salary: number;

  @ApiProperty({
    description: 'Valor do empréstimo solicitado pelo fucionário',
    example: 12500.0,
  })
  @Column({
    name: 'amount',
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
  })
  amount: number;

  @ApiProperty({
    description: 'Valor do score fornecido pela avaliadora de risco',
    example: 700,
  })
  @Column({ name: 'score', nullable: true })
  score: number;

  @ApiProperty({
    description: 'Quantidade de parcelas para pagamento da dívida',
    example: 3,
  })
  @Column({ name: 'times', nullable: false })
  times: number;

  @ApiProperty({
    description: 'Indica se o depósito foi realizado',
    example: false,
  })
  @Column({ name: 'deposit', nullable: false, default: false })
  deposit: boolean;

  @ApiProperty({
    description: 'Relação de trabalho',
    example: { id: 'b7982992-dee4-43eb-b54e-ca48517d13b1' },
  })
  @ManyToOne(() => EmploymentEntity, { eager: true })
  @JoinColumn()
  employment: EmploymentEntity;

  @ApiProperty({
    description: 'Funcionário',
    example: { id: 'b7982992-dee4-43eb-b54e-ca48517d13b1' },
  })
  @ManyToOne(() => PersonEntity, { eager: true })
  @JoinColumn()
  employee: PersonEntity;

  @ApiProperty({
    description: 'Empresa',
    example: { id: 'b7982992-dee4-43eb-b54e-ca48517d13b1' },
  })
  @ManyToOne(() => CompanyEntity, { eager: true })
  @JoinColumn()
  company: CompanyEntity;

  @CreateDateColumn({ name: 'created_at', select: false })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at', select: false })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at', select: false })
  deletedAt: string;
}
