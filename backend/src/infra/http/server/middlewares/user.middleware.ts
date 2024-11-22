import { RequestHandler } from 'express'

export const userMiddleware: RequestHandler = (req, res, next) => {
  const authHeader = req.headers.authorization
  if (authHeader) {
    const [bearer, token] = authHeader.split(' ')
    if (bearer !== 'Bearer' || !token) {
      res.sendStatus(401)
      return
    }
    req.headers.token = token
  }

  next()
}
