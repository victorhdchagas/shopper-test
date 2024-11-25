import originalpgp from 'pg-promise'
import ShopperConfig from '../config'
const config = ShopperConfig.get()
const pgp = originalpgp()
const db = pgp(
  `postgres://${config.DB_USER}:${config.DB_PASSWD}@${config.DB_HOST}/${config.DB_NAME}`,
)

export { db, pgp }
