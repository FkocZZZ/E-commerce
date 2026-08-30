import { Category } from "src/modules/category/entities/category.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { ProductImage } from "./product-image.entity";

@Entity('product')
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  categoryId!: number;

  @ManyToOne(() => Category, (category) => category.products, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'categoryId'})
  category!: Category;
  
  @OneToMany(() => ProductImage, (image) => image.product, { cascade: true})
  images!: ProductImage[];

  @Column()
  name!: string;
  
  @Index()
  @Column({ length: 100, nullable: true })
  brand?: string;

  @Column({ unique: true })
  slug!: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'float', default: 0.0 })
  rating?: number;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  price!: number;

  @Column({ type: 'int', default: 0 })
  quantity?: number;

  @Column({ unique: true, nullable: true })
  sku?: string;

  @Column({ nullable: true })
  thumbnailUrl?: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt!: Date;
}
