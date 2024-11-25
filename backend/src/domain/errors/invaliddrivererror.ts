import { CustomError } from './customerror'

export default class InvalidDriverError extends CustomError {
  statusCode: number = 400
  constructor(message: string = 'Motorista inválido.') {
    super(message)
    this.name = 'INVALID_DRIVER'
  }
}
