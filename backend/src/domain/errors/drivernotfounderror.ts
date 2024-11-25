import { CustomError } from './customerror'

export default class DriverNotFoundError extends CustomError {
  statusCode: number = 404
  constructor(message: string = 'Motorista não encontrado.') {
    super(message)
    this.name = 'DRIVER_NOT_FOUND'
  }
}
