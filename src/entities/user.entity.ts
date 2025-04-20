import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 20 })
  name: string;

  @Column({ nullable: false, type: 'varchar', unique: true })
  email: string;

  @Column({ nullable: true, type: 'varchar', length: 255 })
  password: string;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;
}
