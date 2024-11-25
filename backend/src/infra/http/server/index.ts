import express from 'express'
import { corsMiddleware } from './middlewares/cors.middleware'
import productRoute from '@/infra/http/server/routes/product.route'
import RideRouter from './routes/ride.route'
const server = express()

server.use(corsMiddleware)
server.use(express.json())
// server.use((_, res) => {
//   res.status(404).json({ message: 'Rota não encontrada.' })
// })

server.use('/ride', RideRouter)
server.get('/', (req, res) => {
  res.send("Hi, i'm goku!")
})

export default server
