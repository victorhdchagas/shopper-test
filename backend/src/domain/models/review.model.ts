export class ReviewModel {
  constructor(
    public readonly id: number,
    public readonly createdAt: Date,
    public readonly rating: number,
    public readonly comment?: string,
  ) {}
}
