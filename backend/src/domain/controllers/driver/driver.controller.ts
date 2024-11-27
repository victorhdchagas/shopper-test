import { DriverServiceInterface } from '@/infra/database/services/driverService.interface'

export class DriverController {
  constructor(private readonly driverService: DriverServiceInterface) {}

  async getAllDrivers(customer_id?: string) {
    return await this.driverService
      .getDriversByCustomer(customer_id)
      .then((drivers) =>
        drivers.map((driver: any) => ({
          id: driver.id,
          name: driver.fullname,
          description: driver.bio,
          minkm: driver.minkm,
          tax: driver.tax,
        })),
      )
  }
}
