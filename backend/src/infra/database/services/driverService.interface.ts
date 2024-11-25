export interface DriverServiceInterface {
  getDriversByDistance(distance: number): Promise<any>
  getDriverByArgs(args: { id: number } | { name: string }): Promise<any>
}
