import { RideController } from '../controllers/ride/ride.controller'
import { PGDriverService } from '../../infra/database/services/driverService'
import { GoogleRoutesService } from '@/infra/routestracer/googleroutes.service'
import ShopperConfig from '@/infra/config'
import PostgresDatabaseService from '@/infra/database/postgres.service'
import { WinstonLogger } from '@/infra/logger/winstonlogger'
import { db, pgp } from '@/infra/database/postgre.singleton'
import { CustomerController } from '../controllers/customer/customer.controller'
import { PGCustomerService } from '@/infra/database/services/customerservice'

export default class CustomerControllerFactory {
  static create() {
    return new CustomerController(
      new PGCustomerService(
        new PostgresDatabaseService(new WinstonLogger(), pgp, db),
      ),
    )
  }
}
