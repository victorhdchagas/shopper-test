import RoutesInterface from './routes/routes.interface'
import { ServerInterface } from './server.interface'
import express from 'express'
import { Server } from 'node:http'

export default class ExpressServer implements ServerInterface {
  app: express.Express
  server?: Server
  /**
   *
   */
  constructor(private readonly port: number) {
    this.app = express()
  }
  start(cb?: () => void): void {
    this.app.listen(
      this.port,
      cb
        ? cb
        : () => {
            console.log(`Server running on port ${this.port}`)
          },
    )
  }
  stop(): void {
    if (this.server) this.server.close()
  }

  addRoute(...route: RoutesInterface[]): void {
    for (const r of route) {
      this.app.use(r.path, r.handler)
    }
  }

  addMiddleware(...middleware: MiddlewareType[]): void {
    for (const m of middleware) {
      if (m.execAfter) {
        this.app.use((req, res, next) => {
          m.handler(req, res)
          next()
        })
      } else {
        this.app.use((req, res, next) => {
          next()
          m.handler(req, res)
        })
      }
    }
  }
}

interface MiddlewareType {
  handler: (req: any, res: any) => void
  execAfter: boolean
}

const myAuthMiddleware: MiddlewareType = {
  handler: (req, res) => {req.user = "wutachi"},
  execAfter: false,
}

const server = new ExpressServer(3000)
server.addMiddleware({
  handler: () => {
    console.log('hi')
  },
  execAfter: true,
})
server.addRoute({
  path: '/',
  method: 'get',
  handler: (req, res) => res.send('Hello World!'),
},{
  path: '/test',
  method: 'get',
  handler: (req, res) => res.send('Hello World!'),
  addMiddleware(myAuthMiddleware)
})