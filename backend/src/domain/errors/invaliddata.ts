import { CustomError } from './customerror'

export default class InvalidDataError extends CustomError {
  statusCode: number = 400
  constructor(message: string = 'INVALID_DATA') {
    super(message)
    this.name = 'INVALID_DATA'
  }
}
