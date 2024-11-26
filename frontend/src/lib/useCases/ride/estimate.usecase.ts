import CustomError, { CustomErrorProtocol } from '../../types/error/customerror'
import { EstimateServiceResponse } from '../../types/services/ride/estimate.response'
import UseCaseInterface from '../../types/usecase.interface'

export default class EstimateUseCase
  implements
    UseCaseInterface<
      { customer_id: string; origin: string; destination: string },
      EstimateServiceResponse
    >
{
  constructor(
    private readonly fetch: (
      input: RequestInfo | URL,
      init?: RequestInit,
    ) => Promise<Response>,
  ) {}
  async execute({
    customer_id,
    origin,
    destination,
  }: {
    customer_id: string
    origin: string
    destination: string
  }) {
    const response = await this.fetch(`http://localhost:3000/ride/estimate`, {
      method: 'POST',
      body: JSON.stringify({ customer_id, origin, destination }),
    })
    if (response.status >= 200 && response.status < 500) {
      const data = (await response.json()) as
        | CustomErrorProtocol
        | EstimateServiceResponse
      if ('error_description' in data) {
        throw new CustomError(data.error_description, data.error_code)
      }
      if (response.status < 300) {
        return data
      }
    } else {
      throw new Error('Unhandled error')
    }

    throw new Error('Unhandled error')
  }
}
