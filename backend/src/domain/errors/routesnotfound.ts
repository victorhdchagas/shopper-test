import { CustomError } from './customerror'

export default class RoutesNotFoundError extends CustomError {
  statusCode: number = 400
  constructor(message: string = 'ROUTES_NOT_FOUND') {
    super(message)
    this.name = 'RoutesNotFound'
  }
}
