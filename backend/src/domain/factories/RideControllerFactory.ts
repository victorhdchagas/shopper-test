import { RideController } from '../controllers/ride/ride.controller'
import { PGDriverService } from '../../infra/database/services/driverService'
import { GoogleRoutesService } from '@/infra/routestracer/googleroutes.service'
import ShopperConfig from '@/infra/config'
import PostgresDatabaseService from '@/infra/database/postgres.service'
import { WinstonLogger } from '@/infra/logger/winstonlogger'
import { db, pgp } from '@/infra/database/postgre.singleton'

export default class RideControllerFactory {
  static create() {
    return new RideController(
      new GoogleRoutesService(ShopperConfig.get().GOOGLE_API_KEY),
      new PGDriverService(
        new PostgresDatabaseService(new WinstonLogger(), pgp, db),
      ),
    )
  }
}
