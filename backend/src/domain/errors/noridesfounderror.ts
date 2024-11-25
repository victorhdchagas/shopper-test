import { CustomError } from './customerror'

export default class NoRidesFoundError extends CustomError {
  statusCode: number = 404

  constructor(message: string = 'Nenhum registro encontrado.') {
    super(message)
    this.name = 'NO_RIDES_FOUND'
  }
}
