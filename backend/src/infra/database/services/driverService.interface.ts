export type RIDE_INPUT = {
  customer_id: string
  origin: string
  destination: string
  distance: number
  duration: string
  driverId: number
  value: number
}
export interface DriverServiceInterface {
  getDriversByDistance(distance: number): Promise<any>
  getDriverByArgs(args: { id: number } | { name: string }): Promise<any>
  ride(input: RIDE_INPUT): Promise<any>
}
