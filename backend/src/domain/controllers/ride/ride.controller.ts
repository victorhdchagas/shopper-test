import { RidePostDTO } from '@/domain/dtos/ride/ridepost.dto'
import DriverNotFoundError from '@/domain/errors/drivernotfounderror'
import InvalidDistanceError from '@/domain/errors/invaliddistanceerror'
import RoutesNotFoundError from '@/domain/errors/routesnotfound'
import { DriverServiceInterface } from '@/infra/database/services/driverService.interface'
import { RouteTracerInterface } from '@/infra/routestracer/routestracer.interface'

interface ESTIMATE_INPUT {
  origin: string
  destination: string
  customer_id: string
}

interface CONFIRM_INPUT {
  customer_id: string
  origin: string
  destination: string
  distance: number
  duration: string
  driver:
    | {
        id: number
      }
    | {
        name: string
      }
    | {
        id: number
        name: string
      }
}
export class RideController {
  constructor(
    private readonly routeTracer: RouteTracerInterface,
    private readonly driverService: DriverServiceInterface,
  ) {}

  /**
   * Calcula a rota entre origem e destino e busca motoristas pela distância
   * mais curta.
   *
   * @param input - Dados da viagem
   * @returns - Dados da viagem incluindo a rota mais eficiente e os motoristas
   *           ordenados por preço mais barato
   * @throws {RoutesNotFoundError} - Caso não seja possível calcular a rota
   */
  async estimate(input: ESTIMATE_INPUT): Promise<RidePostDTO> {
    // Calcular a rota entre origem e destino
    const routeData = await this.routeTracer.traceRoute(
      input.origin,
      input.destination,
    )
    if (!routeData || !routeData.routes || routeData.routes.length === 0) {
      throw new RoutesNotFoundError()
    }
    const mostEfficientRoute = routeData.routes[0]
    // const distanceInKM = mostEfficientRoute.distanceMeters / Math.floor(1e3)
    // Buscar motoristas por KM minima, Ordenar por mais barato
    const drivers = await this.driverService.getDriversByDistance(
      mostEfficientRoute.distanceMeters / 1e3,
    )

    const options = drivers.map(
      (driver: {
        alias: string
        comment: string
        rating: number
        id: any
        fullname: any
        description: any
        tax: number
        cost: number
      }) => {
        if (!driver.alias) throw new Error('Vehicle not found')
        return {
          id: driver.id,
          name: driver.fullname,
          description: driver.description,
          vehicle: driver.alias,
          review: {
            comment: driver.comment, // Comentários deveriam ser opcionais.
            rating: driver.rating,
          },
          value: driver.cost,
        }
      },
    )

    return {
      origin: mostEfficientRoute.legs[0].startLocation,
      destination:
        mostEfficientRoute.legs[mostEfficientRoute.legs.length - 1].endLocation,
      distance: mostEfficientRoute.distanceMeters / 1e3,
      duration: mostEfficientRoute.duration,
      options,
      routeResponse: routeData,
    }
  }
  async confirm(input: CONFIRM_INPUT) {
    const receivedDriverData = await this.driverService.getDriverByArgs(
      input.driver,
    )
    if (!receivedDriverData)
      throw new DriverNotFoundError('Motorista não encontrado.')
    if (input.distance < receivedDriverData.minkm)
      throw new InvalidDistanceError(
        'A quilometragem informada não é válida para o motorista selecionado.',
      )
  }
  async getRide() {}
}
