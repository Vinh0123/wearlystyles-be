import { UserRepository } from "@repositories/user.repository"
import { hashPassword, comparePassword } from "@utils/hash.util"
import { generateToken, generateRefreshToken } from "@utils/jwt.util"
import { AuthError } from "@common/errors/auth-error"
import { AppError } from "@common/errors/app-error"
import { MESSAGES } from "@common/constants/messages.constant"
import { ErrorCode } from "@common/enums/error-code.enum"
import type { RegisterDTO, LoginDTO } from "./auth.dto"
import type { User } from "@entities/user.entity"

export class AuthService {
  private userRepository = new UserRepository()

  async register(data: RegisterDTO): Promise<{ user: Partial<User>; token: string; refreshToken: string }> {
    // Check if user already exists
    const existingUser = await this.userRepository.findByEmail(data.email)
    if (existingUser) {
      throw new AppError(MESSAGES.AUTH_EMAIL_EXISTS, 409, ErrorCode.CONFLICT)
    }

    // Hash password
    const hashedPassword = await hashPassword(data.password)

    // Create user
    const user = await this.userRepository.create({
      email: data.email,
      password: hashedPassword,
      firstName: data.firstName,
      lastName: data.lastName,
    })

    // Generate tokens
    const token = generateToken({ id: user.id, email: user.email, role: user.role })
    const refreshToken = generateRefreshToken({ id: user.id, email: user.email })

    // Save refresh token
    await this.userRepository.update(user.id, { refreshToken })

    // Return user without password
    const { password, ...userWithoutPassword } = user
    return {
      user: userWithoutPassword,
      token,
      refreshToken,
    }
  }

  async login(data: LoginDTO): Promise<{ user: Partial<User>; token: string; refreshToken: string }> {
    // Find user
    const user = await this.userRepository.findByEmail(data.email)
    if (!user) {
      throw new AuthError(MESSAGES.AUTH_INVALID_CREDENTIALS)
    }

    // Verify password
    const isPasswordValid = await comparePassword(data.password, user.password)
    if (!isPasswordValid) {
      throw new AuthError(MESSAGES.AUTH_INVALID_CREDENTIALS)
    }

    // Generate tokens
    const token = generateToken({ id: user.id, email: user.email, role: user.role })
    const refreshToken = generateRefreshToken({ id: user.id, email: user.email })

    // Update refresh token and last login
    await this.userRepository.update(user.id, {
      refreshToken,
      lastLoginAt: new Date(),
    })

    const { password, ...userWithoutPassword } = user
    return {
      user: userWithoutPassword,
      token,
      refreshToken,
    }
  }

  async logout(userId: string): Promise<void> {
    await this.userRepository.update(userId, { refreshToken: null })
  }

  async refreshAccessToken(refreshToken: string): Promise<{ token: string }> {
    const user = await this.userRepository.findByEmail(refreshToken)
    if (!user || user.refreshToken !== refreshToken) {
      throw new AuthError(MESSAGES.AUTH_TOKEN_INVALID)
    }

    const token = generateToken({ id: user.id, email: user.email, role: user.role })
    return { token }
  }
}
