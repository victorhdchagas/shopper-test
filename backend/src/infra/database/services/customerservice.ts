import DatabaseInterface from '@/infra/database/database.interface'
import { CustomerServiceInterface } from './customerservice.interface'

export class PGCustomerService implements CustomerServiceInterface {
  constructor(private readonly database: DatabaseInterface) {}
  async getCustomer(customer_id: string): Promise<any> {
    try {
      return await this.database.query(
        `SELECT id, fullname, created_at FROM customer WHERE id = $1`,
        [customer_id],
      )
    } catch (err) {
      if (
        err &&
        typeof err === 'object' &&
        'message' in err &&
        typeof err.message === 'string'
      ) {
        // Fiz esse ajuste no ulltimo dia, com mais tempo ajustaria
        if (err.message.match(/No data returned from the query/i)) {
          return null
        }
      } else if (typeof err === 'string') {
        if (err.match(/No data returned from the query/i)) {
          return null
        }
      }
      throw err
    }
  }
}
