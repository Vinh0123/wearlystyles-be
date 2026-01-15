export interface RegisterDTO {
  email: string
  password: string
  firstName?: string
  lastName?: string
}

export interface LoginDTO {
  email: string
  password: string
}

export interface RefreshTokenDTO {
  refreshToken: string
}

export interface VerifyEmailDTO {
  email: string
  token: string
}

export interface ResetPasswordDTO {
  email: string
  newPassword: string
  token: string
}
