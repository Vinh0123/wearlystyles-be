import { AppDataSource } from "@config/db"
import { User } from "@entities/user.entity"
import type { PaginationQuery, PaginatedResponse } from "@common/interfaces/pagination.interface"
import { PaginationHelper } from "@helpers/pagination.helper"

export class UserRepository {
  private repository = AppDataSource.getRepository(User)

  async create(user: Partial<User>): Promise<User> {
    const newUser = this.repository.create(user)
    return this.repository.save(newUser)
  }

  async findById(id: string): Promise<User | null> {
    return this.repository.findOneBy({ id })
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.repository.findOneBy({ email })
  }

  async findAll(pagination: PaginationQuery): Promise<PaginatedResponse<User>> {
    const { page, limit, skip } = PaginationHelper.getPaginationParams(pagination)
    const [data, total] = await this.repository.findAndCount({
      skip,
      take: limit,
      order: { createdAt: "DESC" },
    })

    const meta = PaginationHelper.buildPaginationMeta(page, limit, total)
    return { data, meta }
  }

  async update(id: string, user: Partial<User>): Promise<User | null> {
    await this.repository.update(id, user)
    return this.findById(id)
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete(id)
    return (result.affected ?? 0) > 0
  }

  async exists(email: string): Promise<boolean> {
    const count = await this.repository.countBy({ email })
    return count > 0
  }
}
