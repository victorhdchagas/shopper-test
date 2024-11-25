import DatabaseInterface from '@/infra/database/database.interface'
import {
  RIDE_INPUT,
  type DriverServiceInterface,
} from './driverService.interface'

export class PGDriverService implements DriverServiceInterface {
  constructor(private readonly database: DatabaseInterface) {}
  getCustomerRides(customer_id: string, driver_id?: number): Promise<any> {
    const statement: string =
      typeof driver_id === 'number'
        ? 'WHERE r.customer_id = $1 AND r.driver_id = $2'
        : 'WHERE r.customer_id = $1'
    const params =
      typeof driver_id === 'number' ? [customer_id, driver_id] : [customer_id]
    return this.database.query(
      `SELECT r.id, r.customer_id, r.origin, r.destination, r.distance, r.duration, r.driver_id, r.value, d.id as driver_id, d.fullname  FROM ride r LEFT JOIN driver d ON r.driver_id = d.id ${statement} order by r.id desc`,
      params,
    )
  }
  ride(input: RIDE_INPUT): Promise<any> {
    return this.database.execute(
      `INSERT INTO ride (customer_id, origin, destination, distance, duration, driver_id,value) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        input.customer_id,
        input.origin,
        input.destination,
        input.distance,
        input.duration,
        input.driverId,
        input.value,
      ],
    )
  }
  getDriverByArgs(args: { id: number } | { name: string }): Promise<any> {
    const statement: string =
      'id' in args ? 'WHERE id = $1' : 'WHERE fullname = $1'
    const params = 'id' in args ? [args.id] : [args.name]
    return this.database.query(
      `SELECT id, fullname, bio,minkm,tax FROM driver ${statement}`,
      params,
    )
  }
  async getDriversByDistance(distance: number): Promise<any> {
    return await this.database.query(
      `SELECT d.id, d.tax, d.fullname, d.bio, v.alias,v.id AS vehicle_id,v.created_at, r.id AS review_id, r.comment, r.rating, (d.tax * $1) AS cost
FROM driver d 
INNER JOIN vehicle v ON d.id = v.driver_id
INNER JOIN (
    SELECT driver_id, id, comment, rating,ROW_NUMBER() OVER (PARTITION BY driver_id ORDER BY created_at DESC) AS rn
    FROM review
) r ON d.id = r.driver_id AND r.rn = 1
WHERE minkm >= $1
order by cost asc;`,
      [distance],
    )

    // // const driverOptions = drivers.map(
    // //   (driver: any): DriverOptionDTO => ({
    // //     id: driver.id,
    // //     name: driver.fullname,
    // //     description: driver.bio,
    // //     vehicle: driver.alias,
    // //     review: { comment: driver.comment, rating: driver.rating },
    // //     value: driver.tax * distance,
    // //   }),
    // // )
    // const driverModels = drivers.map((driver: any) => {
    //   const driverModel = new DriverModel(
    //     driver.id,
    //     driver.fullname,
    //     driver.bio,
    //     driver.tax,
    //   )
    //   driverModel.addVehicle(
    //     new VehicleModel(driver.id, driver.alias, driver.created_at),
    //   )
    //   driverModel.addReview(
    //     new ReviewModel(
    //       driver.review_id,
    //       driver.comment,
    //       driver.rating,
    //       driver.created_at,
    //     ),
    //   )
    //   return driverModel
    // })
    // return driverModels
  }
}
