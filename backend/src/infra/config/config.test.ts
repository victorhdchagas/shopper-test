import ShopperConfig from '.'
import ShopperConfigInterface from './shopperconfig.interface'

describe('Should test config', () => {
  const OLD_ENV = process.env

  beforeEach(() => {
    process.env = { ...OLD_ENV }
    return
  })
  test('Should throw an error if any field is missing', () => {
    process.env.DB_HOST = undefined
    expect(() => {
      ShopperConfig.get()
    }).toThrow()
  })
  test('Should instantiate config', () => {
    let config: ShopperConfigInterface

    config = ShopperConfig.get()
    expect(config).toBeDefined()
  })
  test('Should test Working fields', () => {
    const config = ShopperConfig.get()
    expect(config.API_PORT).toBeDefined()
    expect(config.DB_HOST).toBeDefined()
    expect(config.DB_NAME).toBeDefined()
    expect(config.DB_PASSWD).toBeDefined()
    expect(config.DB_PORT).toBeDefined()
    expect(config.DB_USER).toBeDefined()
  })

  test('Should test all fields broken', () => {
    const env = process.env
    const properties = Object.getOwnPropertyNames(ShopperConfig.prototype)
    properties
      .filter((prop) => {
        const descriptor = Object.getOwnPropertyDescriptor(
          ShopperConfig.prototype,
          prop,
        )
        return descriptor && typeof descriptor.get === 'function'
      })
      .forEach((field) => {
        ShopperConfig.constructor([])
        process.env[field] = undefined

        const config = ShopperConfig.get()
        expect(() => config[field as keyof ShopperConfigInterface]).toThrow()
        process.env[field] = env[field]
      })
  })
  test('Should test NODE_ENV', () => {
    const config = ShopperConfig.get()
    expect(config.NODE_ENV).toBe('test')
    process.env.NODE_ENV = 'development!'
    expect(() => ShopperConfig.get().NODE_ENV).toThrow('NODE_ENV is not valid')
    process.env.NODE_ENV = 'DeVELOPMENT'
    expect(config.NODE_ENV).toBe('development')
  })
})
