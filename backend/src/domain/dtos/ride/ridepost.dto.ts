interface LatLon {
  latitude: number
  longitude: number
}
interface Review {
  rating: number
  comment: string
}
export interface DriverOptionDTO {
  id: number
  name: string
  description: string
  vehicle: string
  review: Review
  value: number
}

export interface RidePostDTO {
  origin: LatLon
  destination: LatLon
  distance: number
  duration: string
  options: DriverOptionDTO[]
  routeResponse: object
}
