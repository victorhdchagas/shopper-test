import CustomError, { CustomErrorProtocol } from '../../types/error/customerror'
import { HistoryResponse } from '../../types/services/ride/history.response'
import UseCaseInterface from '../../types/usecase.interface'

export default class HistoryUseCase
  implements
    UseCaseInterface<
      { customer_id: string; driver_id?: number | `${number}` },
      HistoryResponse
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
    driver_id,
  }: {
    customer_id: string
    driver_id?: number | `${number}`
  }) {
    const searchParams = new URLSearchParams()
    if (driver_id) searchParams.set('driver_id', driver_id.toString())

    const response = await this.fetch(
      `http://localhost:3000/ride/${customer_id}?${searchParams.toString()}`,
    )
    if (response.status >= 200 && response.status < 500) {
      const data = (await response.json()) as
        | CustomErrorProtocol
        | HistoryResponse
      if ('error_description' in data) {
        throw new CustomError(data.error_description, data.error_code)
      }
      if (response.status < 300) {
        return data
      }
    } else {
      throw new CustomError('Unhandled error', 'UNHANDLED_ERROR')
    }

    throw new CustomError('Unhandled error', 'UNHANDLED_ERROR')
  }
}
