export default abstract class ShopperConfigInterface {
  constructor(nonOptionalData: (keyof ShopperConfigInterface)[]) {
    nonOptionalData.forEach((expectedKey) => {
      const expectedData = this[expectedKey]
      if (!expectedData) throw new Error(`${expectedKey} is required`)
    })
  }
  abstract API_PORT: number
  abstract GOOGLE_API_KEY: string
  abstract DB_HOST: string
  abstract DB_USER: string
  abstract DB_PASSWD: string
  abstract DB_PORT: string
  abstract DB_NAME: string
  abstract NODE_ENV: NODE_ENV
}

export type NODE_ENV = 'development' | 'production' | 'test'
