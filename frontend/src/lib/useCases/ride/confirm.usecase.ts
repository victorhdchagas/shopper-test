import CustomError, { CustomErrorProtocol } from '../../types/error/customerror'
import { ConfirmResponseInput } from '../../types/services/ride/confirm.response'
import UseCaseInterface from '../../types/usecase.interface'

export default class ConfirmUseCase
  implements UseCaseInterface<ConfirmResponseInput, { success: 'string' }>
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
  async execute(props: ConfirmResponseInput) {
    //Essa gambiarra me envergonha, mas preciso fazer ela pra poder ter um ambiente de testes. Precisaria de mais tempo pra pensar em algo mais sofisticado
    const response = this.fetch
      ? await this.fetch(`http://localhost:8080/ride/confirm`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(props),
        })
      : await fetch(`http://localhost:8080/ride/confirm`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(props),
        })

    if (response.status >= 200 && response.status < 500) {
      const data = (await response.json()) as
        | CustomErrorProtocol
        | { success: 'string' }
      if ('error_description' in data) {
        throw new CustomError(data.error_description, data.error_code)
      }
      if (response.status < 300) {
        return data
      }
    } else {
      throw new CustomError('Unhandled error', 'UNHANDLED_ERROR')
    }

    throw new CustomError('Unhandled error', 'CONFIRM_UC')
  }
}
