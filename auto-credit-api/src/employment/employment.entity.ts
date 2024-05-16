import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { PersonEntity } from 'src/person/person.entity';
import { CompanyEntity } from 'src/company/company.entity';

@Entity({ name: 'employments' })
export class EmploymentEntity {
  @ApiProperty({
    description: 'Identificador único',
    example: 'b7982992-dee4-43eb-b54e-ca48517d13b1',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'salary', nullable: false })
  salary: number;

  @ApiProperty({
    description: 'Funcionário',
    example: { id: 'b7982992-dee4-43eb-b54e-ca48517d13b1' },
  })
  @OneToOne(() => PersonEntity, { eager: true })
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
