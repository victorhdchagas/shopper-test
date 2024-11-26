import { db, pgp } from '@/infra/database/postgre.singleton'
import PostgresDatabaseService from '@/infra/database/postgres.service'
import { WinstonLogger } from '@/infra/logger/winstonlogger'
import { PGDriverService } from '../../infra/database/services/driverService'
import { DriverController } from '../controllers/driver/driver.controller'

export default class DriverControllerFactory {
  static create() {
    return new DriverController(
      new PGDriverService(
        new PostgresDatabaseService(new WinstonLogger(), pgp, db),
      ),
    )
  }
}
