import DatabaseInterface from '@/infra/database/database.interface'
import { type DriverServiceInterface } from './driverService.interface'

export class PGDriverService implements DriverServiceInterface {
  constructor(private readonly database: DatabaseInterface) {}
  getDriverByArgs(args: { id: number } | { name: string }): Promise<any> {
    const statement: string =
      'id' in args ? 'WHERE id = $1' : 'WHERE fullname = $1'
    const params = 'id' in args ? [args.id] : [args.name]
    return this.database.query(
      `SELECT id, fullname, bio FROM driver ${statement}`,
      [params],
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
