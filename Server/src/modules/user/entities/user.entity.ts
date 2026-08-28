import { Exclude } from "class-transformer";
import { randomBytes } from "crypto";
import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v7 as uuidv7 } from 'uuid';

export enum UserRole {
  ADMIN = 'admin',
  STAFF = 'staff',
  USER = 'user'
}
@Entity('user')
export class User {
  @PrimaryColumn('uuid')
  id!: string;

  @Column({ length: 100, unique: true })
  email!: string;

  @Column({select: false})
  @Exclude()
  password!: string;

  @Column({ length: 100 })
  username!: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role!: UserRole;

  @Column({ nullable: true })
  avatarUrl?: string;

  @Column({ nullable: true })
  address?: string;

  @Column({ length: 20, nullable: true })
  phone!: string;

  @Column({ default: true })
  isActive!: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt!: Date;

  @BeforeInsert()
  handleBeforeInsert() {
    if (!this.id) this.id = uuidv7();

    if (!this.username) {
      const randomString = randomBytes(4).toString('hex');
      this.username = `user-${randomString}`;
    }
  }
}
