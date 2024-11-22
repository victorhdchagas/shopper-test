import dotenv from 'dotenv'
dotenv.config()
import ShopperConfig from './infra/config'
import server from '@/infra/http/server'

function main() {
  const config = ShopperConfig.get()
  server.listen(config.API_PORT, () => {
    console.log(
      `Server running on port ${config.API_PORT} http://localhost:${config.API_PORT}`,
    )
  })
}

main()
