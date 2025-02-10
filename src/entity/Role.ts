import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { RoleEnum } from "./constants";

@Entity({ name: "role" })
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "enum", enum: RoleEnum, unique: true })
  name: RoleEnum; 
}
