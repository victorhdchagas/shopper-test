import RoutesInterface from './routes/routes.interface'

export abstract class ServerInterface {
  abstract start(cb?: () => void): void
  abstract stop(): void
  abstract addRoute(...route: RoutesInterface[]): void
}
