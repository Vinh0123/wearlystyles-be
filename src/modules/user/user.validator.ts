import { z } from "zod"
import { isValidEmail } from "@common/validators/email.validator"

export const createUserSchema = z.object({
  body: z.object({
    email: z.string().refine(isValidEmail, "Invalid email format"),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    password: z.string().min(6, "Password must be at least 6 characters"),
  }),
})

export const updateUserSchema = z.object({
  body: z.object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    avatar: z.string().optional(),
  }),
})
