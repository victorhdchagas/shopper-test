import LoggerInterface from './logger.interface'
import logger from './winstoninitialize'
export class WinstonLogger implements LoggerInterface {
  info(message: string, ...data: unknown[]): void {
    logger.info(message, data)
  }
  error(message: string, ...data: unknown[]): void {
    logger.error(message, data)
  }
}
