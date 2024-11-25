import dotenv from 'dotenv'
dotenv.config()
import ShopperConfig from './infra/config'
import server from '@/infra/http/server'
import { WinstonLogger } from './infra/logger/winstonlogger'
const logger = new WinstonLogger()

function main() {
  const config = ShopperConfig.get()
  server.listen(config.API_PORT, () => {
    console.log(
      `Server running on port ${config.API_PORT} http://localhost:${config.API_PORT}`,
    )
  })
}

main()

process.on('rejectionHandled', (reason) => {
  logger.error('Promise Rejection', reason)
})

process.on('unhandledRejection', (reason) => {
  logger.error('Promise Rejection', reason)
})
