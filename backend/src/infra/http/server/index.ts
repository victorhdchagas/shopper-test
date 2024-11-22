import express from 'express'
import { corsMiddleware } from './middlewares/cors.middleware'
import productRoute from '@/infra/http/server/routes/product.route'
const server = express()

server.use(corsMiddleware)
server.use(express.json())

server.use('/product', productRoute)
server.get('/', (req, res) => {
  res.send("Hi, i'm goku!")
})

export default server
