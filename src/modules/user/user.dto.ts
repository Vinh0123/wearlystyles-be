export interface CreateUserDTO {
  email: string
  firstName?: string
  lastName?: string
  password: string
}

export interface UpdateUserDTO {
  firstName?: string
  lastName?: string
  avatar?: string
}

export interface UserResponseDTO {
  id: string
  email: string
  firstName?: string
  lastName?: string
  avatar?: string
  role: string
  status: string
  createdAt: Date
  updatedAt: Date
}
