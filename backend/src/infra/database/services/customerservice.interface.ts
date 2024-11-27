export interface CustomerServiceInterface {
  getCustomer(customer_id: string): Promise<any>
}
