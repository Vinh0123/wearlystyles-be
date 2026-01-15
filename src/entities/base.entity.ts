import { CreateDateColumn, UpdateDateColumn, PrimaryColumn } from "typeorm"
import { generateUUID } from "@utils/uuid.util"

export abstract class BaseEntity {
  @PrimaryColumn("uuid")
  id: string = generateUUID()

  @CreateDateColumn()
  createdAt: Date = new Date()

  @UpdateDateColumn()
  updatedAt: Date = new Date()
}
