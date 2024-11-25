import { ComputeRoutesResponse } from './dto/computeroutesresponse.dto'

export interface RouteTracerInterface {
  /**
   * traceRoute
   *
   * Calcular a rota entre origem e destino(s)
   *
   * @throws RoutesNotFound
   * @param origin - Endereço de origem da viagem (Rua augusta 48, São Paulo, SP)
   * @param destination - Endereço de destino da viagem (Rua augusta 148, São Paulo, SP)
   * @returns Promise<ComputeRoutesResponse>
   */
  traceRoute(
    origin: string,
    ...destination: string[]
  ): Promise<ComputeRoutesResponse>
}
