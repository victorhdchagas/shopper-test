export default interface LoggerInterface {
  info(...data: unknown[]): void
  error(...data: unknown[]): void
}
