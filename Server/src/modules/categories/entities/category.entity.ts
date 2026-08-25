import Helper from "src/ultils/helpers";
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('category')
export class Category {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100 })
  name!: string;

  @Column({ type: 'text', nullable: true })
  description?: string;
  
  @Column({ nullable: true })
  imageUrl?: string;
  
  @Column({ unique: true })
  slug!: string;

  @Column({ default: true })
  isActive!: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;
  
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt!: Date;
}
