import { RidePostDTO } from '@/domain/dtos/ride/ridepost.dto'
import DriverNotFoundError from '@/domain/errors/drivernotfounderror'
import InvalidDataError from '@/domain/errors/invaliddata'
import InvalidDistanceError from '@/domain/errors/invaliddistanceerror'
import NoRidesFoundError from '@/domain/errors/noridesfounderror'
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
  value: number
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
        bio: any
        tax: number
        cost: number
      }) => {
        if (!driver.alias) throw new Error('Vehicle not found')
        return {
          id: driver.id,
          name: driver.fullname,
          description: driver.bio,
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
    if (
      !receivedDriverData ||
      receivedDriverData.length === 0 ||
      !receivedDriverData[0] ||
      typeof receivedDriverData[0].id !== 'number'
    )
      throw new DriverNotFoundError('Motorista inválido.')
    if (input.distance < receivedDriverData[0].minkm)
      throw new InvalidDistanceError()
    if (!input.duration.match(/^\d+[smh]$/))
      throw new InvalidDataError('Duração inválida.')
    await this.driverService.ride({
      ...input,
      driverId: receivedDriverData[0].id,
    })
    return
  }
  async getRide(customer_id: string, driver_id?: number) {
    const databaseResponse = await this.driverService.getCustomerRides(
      customer_id,
      driver_id,
    )
    if (databaseResponse.length === 0) throw new NoRidesFoundError()
    return {
      customer_id,
      rides: databaseResponse.map((ride: any) => ({
        id: ride.id,
        origin: ride.origin,
        destination: ride.destination,
        distance: ride.distance,
        duration: ride.duration,
        driver: {
          id: ride.driver_id,
          name: ride.fullname,
        },
        value: ride.value,
        created_at: ride.created_at,
      })),
    }
  }
}
