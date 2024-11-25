import { RidePostDTO } from '@/domain/dtos/ride/ridepost.dto'

export default class RideEstimateUseCase {
  constructor() {}
  async execute(input: {
    origin: string
    destination: string
  }): Promise<RidePostDTO> {
    throw new Error('Method not implemented.')
  }
}
