export class DriverPlan {
  constructor(
    public readonly id: string,
    public readonly tax: number,
    public readonly distance: number,
    public readonly metric: 'Km' | 'Miles',
    public readonly driverId: string,
  ) {}
}
