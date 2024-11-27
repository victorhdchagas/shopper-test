import CustomError from '../../error/customerror'

export type ConfirmResponseInput = {
  customer_id: string
  origin: string
  destination: string
  distance: number
  duration: string
  driver: {
    id: number
    name: string
  }
  value: number
}

export type ConfirmResponse = { success: boolean } | CustomError
