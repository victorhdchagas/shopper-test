import type { IDatabase, IMain } from 'pg-promise'
import LoggerInterface from '../logger/logger.interface'
import DatabaseInterface from './database.interface'

export default class PostgresDatabaseService implements DatabaseInterface {
  constructor(
    private readonly logger: LoggerInterface,
    private readonly pgp: IMain,
    private readonly db: IDatabase<any>,
  ) {}
  async connect(): Promise<void> {
    this.logger.info('Conectando ao banco de dados')
    await this.db.connect()
  }
  async disconnect(): Promise<void> {
    this.logger.info('Desconectando do banco de dados')
    this.pgp.end()
  }
  clearDatabase(): Promise<void> {
    this.logger.info('Limpa banco de dados')
    throw new Error('Method not implemented.')
  }
  async query(query: string, ...params: any): Promise<any> {
    const res = await this.db.any(query, ...params)

    return res
  }
  queryOne(query: string): Promise<any> {
    this.logger.info('Executando a queryOne:\n', query)
    throw new Error('Method not implemented.')
  }
  async execute(query: string, ...params: any): Promise<void> {
    await this.db.none(query, ...params)
  }
}
