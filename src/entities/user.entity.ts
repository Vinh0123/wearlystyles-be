import { Entity, Column, Index } from "typeorm"
import { BaseEntity } from "./base.entity"
import { UserStatus } from "@common/enums/user-status.enum"
import { ROLES } from "@common/constants/roles.constant"

@Entity("users")
@Index(["email"], { unique: true })
export class User extends BaseEntity {
  @Column({ type: "varchar", length: 255 })
  email: string

  @Column({ type: "varchar", length: 255 })
  password: string

  @Column({ type: "varchar", length: 255, nullable: true })
  firstName?: string

  @Column({ type: "varchar", length: 255, nullable: true })
  lastName?: string

  @Column({ type: "text", nullable: true })
  avatar?: string

  @Column({ type: "varchar", length: 50, default: ROLES.USER })
  role: string

  @Column({ type: "varchar", length: 50, default: UserStatus.ACTIVE })
  status: UserStatus

  @Column({ type: "boolean", default: false })
  emailVerified: boolean

  @Column({ type: "timestamp", nullable: true })
  emailVerifiedAt?: Date

  @Column({ type: "timestamp", nullable: true })
  lastLoginAt?: Date

  @Column({ type: "text", nullable: true })
  refreshToken?: string

  // Relations will be added here
  // @OneToMany(() => Product, (product) => product.user)
  // products: Product[]
}
