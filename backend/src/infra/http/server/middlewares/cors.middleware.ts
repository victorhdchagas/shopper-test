import cors from 'cors'
import config from '@/infra/config'
const devCors: cors.CorsOptions = { origin: '*' }
const prodCors: cors.CorsOptions = {
  origin: (origin, callback) => {
    // Bloqueia localhost em produção
    console.log(origin)
    if (
      config.get().NODE_ENV === 'production' &&
      origin === 'http://localhost:8080'
    ) {
      return callback(new Error('Not allowed by CORS'), false)
    }
    // Permite outras origens
    callback(null, true)
  },
  allowedHeaders: ['Content-Type', 'Authorization'],
}

export const corsMiddleware = cors(
  config.get().NODE_ENV === 'production' ? prodCors : devCors,
)
