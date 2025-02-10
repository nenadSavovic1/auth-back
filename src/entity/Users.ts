import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Role } from "./Role";

@Entity({ name: "users" }) // Ensures table name matches existing schema
export class Users extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  age: number;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;

  @ManyToOne(() => Role, (role) => role.id, { eager: true }) 
  @JoinColumn({ name: "roleId" }) 
  role: Role;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
