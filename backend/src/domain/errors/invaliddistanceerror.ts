import { CustomError } from './customerror'

export default class InvalidDistanceError extends CustomError {
  statusCode: number = 406

  constructor(
    message: string = 'A quilometragem informada não é válida para o motorista selecionado.',
  ) {
    super(message)
    this.name = 'INVALID_DISTANCE'
  }
}
