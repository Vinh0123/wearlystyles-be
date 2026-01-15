import type { Request, Response, NextFunction } from "express"
import { UserService } from "./user.service"
import { SuccessResponse } from "@common/responses/success.response"
import type { CreateUserDTO, UpdateUserDTO } from "./user.dto"

export class UserController {
  private userService = new UserService()

  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const data: CreateUserDTO = req.body
      const result = await this.userService.createUser(data)

      res.status(201).json(new SuccessResponse("User created successfully", result, 201))
    } catch (error) {
      next(error)
    }
  }

  async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      const result = await this.userService.getUserById(id)

      res.json(new SuccessResponse("User fetched successfully", result))
    } catch (error) {
      next(error)
    }
  }

  async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.userService.getAllUsers(req.query)

      res.json(new SuccessResponse("Users fetched successfully", result))
    } catch (error) {
      next(error)
    }
  }

  async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      const data: UpdateUserDTO = req.body
      const result = await this.userService.updateUser(id, data)

      res.json(new SuccessResponse("User updated successfully", result))
    } catch (error) {
      next(error)
    }
  }

  async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      const result = await this.userService.deleteUser(id)

      res.json(new SuccessResponse("User deleted successfully", result))
    } catch (error) {
      next(error)
    }
  }
}
