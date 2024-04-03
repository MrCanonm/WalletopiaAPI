import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BaseFullEntity } from '../../common/base-auditable-entity';

@Entity()
export class AppUser extends BaseFullEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 95, nullable: false })
  full_name: string;

  @Column('varchar', { length: 95, nullable: false })
  user_icom_name: string;

  @Column('varchar', { length: 95, nullable: false })
  access_name: string;

  @Column('varchar', { length: 300, nullable: false })
  access_hash: string;

  @Column('varchar', { length: 95, nullable: false, unique: true })
  email: string;

  @UpdateDateColumn()
  last_login: Date;
}
