import { BaseAuditableEntity } from 'src/common/base-auditable-entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Category extends BaseAuditableEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  category_name: string;

  @Column({ nullable: false })
  icon_name: string;

  @Column({ nullable: false, default: false })
  isDefault: boolean;
}
