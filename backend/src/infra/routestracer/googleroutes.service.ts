import { WinstonLogger } from '../logger/winstonlogger'
import { ComputeRoutesResponse } from './dto/computeroutesresponse.dto'
import { RouteTracerInterface } from './routestracer.interface'

export class GoogleRoutesService implements RouteTracerInterface {
  constructor(private readonly apiKey: string) {}
  async traceRoute(
    origin: string,
    ...destination: string[]
  ): Promise<ComputeRoutesResponse> {
    const firstDestination = destination[0]
    const response = await fetch(
      `https://routes.googleapis.com/directions/v2:computeRoutes`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': this.apiKey,
          'X-Goog-FieldMask':
            'routes.duration,routes.distanceMeters,routes.legs.steps.start_location,routes.legs.steps.end_location,routes.polyline.encodedPolyline',
        },
        body: JSON.stringify({
          origin: { address: origin },
          destination: { address: firstDestination },
          travelMode: 'DRIVE',
          routingPreference: 'TRAFFIC_AWARE',
          computeAlternativeRoutes: false,
          languageCode: 'pt-BR',
          units: 'METRIC',
        }),
      },
    )

    if (!response.ok) {
      new WinstonLogger().error('Error ao calcular rota', response)
      new WinstonLogger().info(response.statusText, await response.text())
      throw new Error('Error ao calcular rota')
    }

    const data = await response.json()
    return data
  }
}
