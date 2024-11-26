export interface CustomErrorProtocol {
  error_description: string
  error_code: string
}

export default class CustomError extends Error {
  error_code: string
  constructor(message: string, error_code: string) {
    super(message)
    this.error_code = error_code
  }
}
