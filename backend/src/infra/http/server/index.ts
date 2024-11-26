import express from 'express'
import { corsMiddleware } from './middlewares/cors.middleware'
import DriverRouter from './routes/driver.route'
import RideRouter from './routes/ride.route'
const server = express()

server.use(corsMiddleware)
server.use(express.json())

server.use('/ride', RideRouter)
server.use('/driver', DriverRouter)
server.get('/', (req, res) => {
  res.send("I'm alive!")
})

export default server
