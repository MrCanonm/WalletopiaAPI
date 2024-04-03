import { Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseAuditableEntity {
  @CreateDateColumn()
  created_at: Date;

  @Column('varchar', { length: 36, nullable: false })
  created_by: string;

  @UpdateDateColumn()
  updated_at: Date;

  @Column('varchar', { length: 36, nullable: false })
  updated_by: string;

  @Column({ type: 'boolean', default: false, nullable: false })
  deleted: boolean;
}

export abstract class BaseFullEntity extends BaseAuditableEntity {
  @Column({
    type: 'boolean',
    default: true,
    nullable: false,
  })
  status: boolean;
}
