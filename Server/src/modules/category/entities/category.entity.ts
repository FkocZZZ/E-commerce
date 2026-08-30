import { Product } from "src/modules/product/entities/product.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

  @OneToMany(() => Product, (product) => product.category)
  products!: Product[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;
  
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt!: Date;

}
