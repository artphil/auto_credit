import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
  @ApiProperty({
    description: 'Identificador único',
    example: 'b7982992-dee4-43eb-b54e-ca48517d13b1',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Nome de usuário', example: 'Nepomuceno' })
  @Column({ name: 'email', length: 100, nullable: false, unique: true })
  email: string;

  @ApiProperty({ description: 'Email', example: 'nepo@email.com' })
  @Column({ name: 'username', length: 70, nullable: false, unique: true })
  username: string;

  @ApiProperty({
    description: 'Senha: deve ter no mínimo 6 caracteres',
    example: '123456',
  })
  @Column({ name: 'password', length: 255, nullable: false, select: false })
  password: string;

  @CreateDateColumn({ name: 'created_at', select: false })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at', select: false })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at', select: false })
  deletedAt: string;
}
