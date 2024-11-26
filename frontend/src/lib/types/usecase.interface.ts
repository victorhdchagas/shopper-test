export default interface UseCaseInterface<T = any, U = any> {
  execute(args: T): Promise<U>
}
