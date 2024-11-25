export default interface DatabaseInterface {
  connect(): Promise<void>
  disconnect(): Promise<void>
  clearDatabase(): Promise<void>
  query(query: string, ...params: any): Promise<any>
  queryOne(query: string, ...params: any): Promise<any>
  execute(query: string, ...params: any): Promise<void>
}
