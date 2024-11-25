import ShopperConfigInterface, { NODE_ENV } from './shopperconfig.interface'

export default class ShopperConfig extends ShopperConfigInterface {
  private static instance: ShopperConfig

  private constructor() {
    super(['API_PORT', 'DB_HOST', 'DB_USER', 'DB_PASSWD', 'DB_NAME'])
  }

  get API_PORT(): number {
    const port = process.env.API_PORT
    if (port) return parseInt(port)
    throw new Error('API_PORT is required')
  }
  get GOOGLE_API_KEY(): string {
    const googleApikey = process.env.GOOGLE_API_KEY
    if (googleApikey) return googleApikey
    throw new Error('GOOGLE_API_KEY is required')
  }

  get DB_HOST(): string {
    const dbhost = process.env.DB_HOST
    if (dbhost) return dbhost
    throw new Error('DB_HOST is required')
  }
  get DB_USER(): string {
    const dbuser = process.env.DB_USER
    if (dbuser) return dbuser
    throw new Error('DB_USER is required')
  }
  get DB_PASSWD(): string {
    const dbpasswd = process.env.DB_PASSWD
    if (dbpasswd) return dbpasswd
    throw new Error('DB_PASSWD is required')
  }
  get DB_NAME(): string {
    const dbname = process.env.DB_NAME
    if (dbname) return dbname
    throw new Error('DB_NAME is required')
  }
  get DB_PORT(): string {
    const dbport = process.env.DB_PORT
    if (dbport) return dbport
    throw new Error('DB_PORT is required')
  }

  get NODE_ENV(): NODE_ENV {
    let NODE_ENV = process.env.NODE_ENV
    if (NODE_ENV) {
      NODE_ENV = NODE_ENV.toLowerCase()
      if (['production', 'development', 'test'].some((v) => v === NODE_ENV))
        return NODE_ENV as NODE_ENV
      throw new Error('NODE_ENV is not valid')
    }
    throw new Error('NODE_ENV is required')
  }

  public static get(): ShopperConfigInterface {
    if (!ShopperConfig.instance) {
      ShopperConfig.instance = new ShopperConfig()
    }

    return ShopperConfig.instance
  }
}
