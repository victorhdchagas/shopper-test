import { CustomError } from '@/domain/errors/customerror'
import DriverControllerFactory from '@/domain/factories/DriverControllerFactory'
import express from 'express'

const DriverRouter = express.Router()

DriverRouter.get('/customer/:customer_id?', async (req, res) => {
  const controller = DriverControllerFactory.create()
  try {
    const output = await controller.getAllDrivers(req.params.customer_id)
    res.send(output)
  } catch (error) {
    if (error instanceof CustomError) {
      console.log(error)
      res.status(error.statusCode).send({ message: error.message })
      return
    }
    console.error(error)
    res.status(500).send({ message: 'Internal server error' })
  }
})

export default DriverRouter
