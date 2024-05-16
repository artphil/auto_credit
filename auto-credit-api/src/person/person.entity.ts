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
import { UserEntity } from 'src/user/user.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Entity({ name: 'people' })
export class PersonEntity {
  @ApiProperty({
    description: 'Identificador único',
    example: 'b7982992-dee4-43eb-b54e-ca48517d13b1',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Nome completo',
    example: 'Nepomuceno de Aguilar',
  })
  @Column({ name: 'name', length: 100, nullable: false })
  name: string;

  @ApiProperty({ description: 'CPF', example: '1235467910' })
  @Column({ name: 'cpf', length: 15, nullable: false })
  cpf: string;

  @ApiPropertyOptional({
    description: 'Usuário vinculado',
    example: { id: 'b7982992-dee4-43eb-b54e-ca48517d13b1' },
  })
  @OneToOne(() => UserEntity, { eager: true })
  @JoinColumn()
  user: UserEntity;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;
}
