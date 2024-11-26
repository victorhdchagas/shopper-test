import { CustomError } from '@/domain/errors/customerror'
import InvalidDataError from '@/domain/errors/invaliddata'
import DriverControllerFactory from '@/domain/factories/DriverControllerFactory'
import express from 'express'

const DriverRouter = express.Router()

DriverRouter.get('/customer/:customer_id?', (req, res) => {
  const controller = DriverControllerFactory.create()
  try {
    if (!req.params.customer_id) throw new InvalidDataError('Invalid data')
    const output = controller.getDriversByCustomer(req.params.customer_id)
    res.send(output)
  } catch (error) {
    if (error instanceof CustomError) {
      res.status(error.statusCode).send({ message: error.message })
    }
    console.error(error)
    res.status(500).send({ message: 'Internal server error' })
  }
})

export default DriverRouter
