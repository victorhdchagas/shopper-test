import express, { RequestHandler } from 'express'
import { userMiddleware } from '../middlewares/user.middleware'
import RideControllerFactory from '@/domain/factories/RideControllerFactory'
import { CustomError } from '@/domain/errors/customerror'
import InvalidDataError from '@/domain/errors/invaliddata'
import logger from '@/infra/logger/winstoninitialize'
const RideRouter = express.Router()

RideRouter.use(userMiddleware)

/**
 * Responsável por receber a origem e o destino da viagem e realizar os
 * cálculos dos valores da viagem.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 */
const estimate: RequestHandler = async (req, res) => {
  const input = req.body
  try {
    if (
      !input.origin ||
      typeof input.origin !== 'string' ||
      !input.destination ||
      typeof input.destination !== 'string' ||
      !input.customer_id ||
      typeof input.customer_id !== 'string'
    ) {
      throw new InvalidDataError('Invalid data')
    }
    if (input.origin === input.destination) {
      throw new InvalidDataError("Origin and destination can't be the same")
    }
    const useCase = RideControllerFactory.create()
    const output = await useCase.estimate(input)

    res.send(output)
  } catch (error) {
    switch (true) {
      case error instanceof CustomError:
        res.status(error.statusCode).send({
          error_description: error.message,
          error_code: error.name,
        })
        return
      case error instanceof Error:
        logger.error('Erro desconhecido', error)
        res.status(500).send({ error: 'Error desconhecido' })
        return
      default:
        res.status(500).send({ error: 'Internal Server Error' })
    }
  }
}

/**
 * Responsável por confirmar a viagem e gravá-la no histórico.
 * @param req - The Request Object
 * @param res - The Response Object
 */
const confirm: RequestHandler = async (req, res) => {
  const input = req.body
  try {
    if (
      !input.origin ||
      typeof input.origin !== 'string' ||
      !input.destination ||
      typeof input.destination !== 'string'
    ) {
      throw new InvalidDataError(
        'Os endereços de origem e destino não podem estar em branco.',
      )
    }
    if (
      typeof input.customer_id !== 'string' ||
      input.customer_id.length === 0
    ) {
      throw new InvalidDataError('O id do usuário não pode estar em branco.')
    }
    if (input.origin === input.destination) {
      throw new InvalidDataError(
        'Os endereços de origem e destino não podem ser o mesmo endereço.',
      )
    }
    if (!input.driver || Object.keys(input.driver).length === 0) {
      throw new InvalidDataError('Motorista inválido')
    }

    const controller = RideControllerFactory.create()
    await controller.confirm(input)

    res.status(200).send('Viagem confirmada com sucesso')
  } catch (error) {
    if (error instanceof CustomError) {
      res.status(error.statusCode).send({
        error_description: error.message,
        error_code: error.name,
      })
      return
    } else if (error instanceof Error) {
      logger.error('Erro desconhecido', error)
      res.status(500).send({ error_description: 'Error desconhecido' })
      return
    } else {
      res.status(500).send({ error_description: 'Internal Server Error' })
      return
    }
  }
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
