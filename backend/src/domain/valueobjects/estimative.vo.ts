export default class EstimativeVO {
  constructor(
    public readonly origin: string,
    public readonly destination: string[] | string,
  ) {}

  async getDistance() {} // Não serviria pois dependeria de uma consulta externa.
}
