import { ReviewModel } from './review.model'
import { VehicleModel } from './vehicle.model'

export class DriverModel {
  vehicle: VehicleModel | null = null
  reviews: ReviewModel[] = []

  constructor(
    public readonly id: number, // Poderia ser UUID aqui, se precisar colocar publico evita ataque por QueryParams
    public readonly name: string,
    public readonly description: string,
    public readonly tax: number = 0,
  ) {}

  addReview(review: ReviewModel) {
    this.reviews.push(review)
  }

  addVehicle(vehicle: VehicleModel) {
    this.vehicle = vehicle
  }
}
