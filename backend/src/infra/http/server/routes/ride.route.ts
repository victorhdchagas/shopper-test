import express, { RequestHandler } from 'express'
import { userMiddleware } from '../middlewares/user.middleware'
const RideRouter = express.Router()

RideRouter.use(userMiddleware)

/**
 * Responsável por receber a origem e o destino da viagem e realizar os
 * cálculos dos valores da viagem.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 */
const estimate: RequestHandler = (req, res) => {
  res.send("Hi, i'm goku in Ride!")
}

/**
 * Responsável por confirmar a viagem e gravá-la no histórico.
 * @param req - The Request Object
 * @param res - The Response Object
 */
const confirm: RequestHandler = (req, res) => {
  res.send("Hi, i'm goku in Ride!")
}

/**
 * GET /ride/{customer_id}?driver_id={id do motorista}
 *
 * Responsável por listar as viagens realizadas por um determinado
 * usuário
 * @param req - The Request Object (params must have driver_id )
 * @param res
 */
const getRide: RequestHandler = (req, res) => {
  res.send("Hi, i'm goku in Ride!")
}

RideRouter.post('/estimate', estimate)

RideRouter.patch('/confirm', confirm)

RideRouter.get('/{customer_id}', getRide)

export default RideRouter
