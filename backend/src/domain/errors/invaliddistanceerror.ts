import { CustomError } from './customerror'

export default class InvalidDistanceError extends CustomError {
  statusCode: number = 404
  constructor(message: string = 'Quilometragem inválida para o motorista.') {
    super(message)
    this.name = 'INVALID_DISTANCE'
  }
}
