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
  fetch?: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>
  constructor(
    paramFetch?: (
      input: RequestInfo | URL,
      init?: RequestInit,
    ) => Promise<Response>,
  ) {
    if (paramFetch) this.fetch = paramFetch
  }
  async execute({
    customer_id,
    origin,
    destination,
  }: {
    customer_id: string
    origin: string
    destination: string
  }) {
    //Essa gambiarra me envergonha, mas preciso fazer ela pra poder ter um ambiente de testes. Precisaria de mais tempo pra pensar em algo mais sofisticado
    const response = this.fetch
      ? await this.fetch(`http://localhost:8080/ride/estimate`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ customer_id, origin, destination }),
        })
      : await fetch(`http://localhost:8080/ride/estimate`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
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
