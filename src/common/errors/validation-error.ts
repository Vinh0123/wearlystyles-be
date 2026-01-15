import { AppError } from "./app-error"
import { ErrorCode } from "../enums/error-code.enum"

export class ValidationError extends AppError {
  constructor(message: string, details?: any) {
    super(message, 400, ErrorCode.VALIDATION_ERROR)
    Object.setPrototypeOf(this, ValidationError.prototype)
  }
}
