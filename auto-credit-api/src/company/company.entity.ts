import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PersonEntity } from 'src/person/person.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Entity({ name: 'companies' })
export class CompanyEntity {
  @ApiProperty({
    description: 'Identificador único',
    example: 'b7982992-dee4-43eb-b54e-ca48517d13b1',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Razão social', example: 'Loja da Esquina' })
  @Column({ name: 'name', length: 100, nullable: false })
  name: string;

  @ApiProperty({ description: 'CNPJ', example: '12345678000190' })
  @Column({ name: 'cnpj', length: 20, nullable: false })
  cnpj: string;

  @ApiPropertyOptional({
    description: 'Representante da empresa',
    example: '{ id: b7982992-dee4-43eb-b54e-ca48517d13b1 }',
  })
  @OneToOne(() => PersonEntity, { eager: true })
  @JoinColumn()
  representative: PersonEntity;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;
}
