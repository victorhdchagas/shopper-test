import CustomError, { CustomErrorProtocol } from '../../types/error/customerror'
import UseCaseInterface from '../../types/usecase.interface'

export default class GetAllDriversUseCase
  implements
    UseCaseInterface<{ customer_id?: string }, { id: number; name: string }[]>
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
  async execute({ customer_id }: { customer_id: string }) {
    //Essa gambiarra me envergonha, mas preciso fazer ela pra poder ter um ambiente de testes. Precisaria de mais tempo pra pensar em algo mais sofisticado
    const response = this.fetch
      ? await this.fetch(
          `http://localhost:8080/driver/customer${
            customer_id ? '?customer_id=' + customer_id : ''
          }`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )
      : await fetch(
          `http://localhost:8080/driver/customer${
            customer_id ? '?customer_id=' + customer_id : ''
          }`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )
    if (response.status >= 200 && response.status < 500) {
      const data = (await response.json()) as
        | CustomErrorProtocol
        | { id: number; name: string }[]
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
