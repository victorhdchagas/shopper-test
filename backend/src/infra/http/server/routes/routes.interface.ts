export default interface RoutesInterface {
  path: string
  method: string
  handler: (req: any, res: any, next: any) => void
  addRoute?(...route: RoutesInterface[]): void
  addMiddleware?(...middleware: MiddlewareType[]): void
}
interface MiddlewareType {
  handler: (req: any, res: any) => void
  execAfter: boolean
}
