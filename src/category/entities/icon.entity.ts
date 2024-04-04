import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Icons {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  IconName: string;
}
