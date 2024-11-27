import { CustomerDTO } from '@/domain/dtos/customer/customer.dto'
import InvalidDataError from '@/domain/errors/invaliddata'
import { CustomerServiceInterface } from '@/infra/database/services/customerservice.interface'

export class CustomerController {
  constructor(private readonly customerService: CustomerServiceInterface) {}

  async getCustomer(customer_id: string): Promise<CustomerDTO | null> {
    // Calcular a rota entre origem e destino
    try {
      const customer = await this.customerService.getCustomer(customer_id)
      if (!customer) {
        throw new InvalidDataError('Cliente não encontrado.')
      }

      return {
        id: customer.id,
        fullname: customer.fullname,
        created_at: customer.created_at,
      }
    } catch (error) {
      throw new InvalidDataError('Cliente não encontrado.')
    }
  }
}
