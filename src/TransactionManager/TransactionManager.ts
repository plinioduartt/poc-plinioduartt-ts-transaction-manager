import { DataSource } from "typeorm";
import { InvalidDataSourceError } from "./errors";
import { GenericDataSource, ITransactionManager } from "./ITransactionalManager";


export class TransactionManager implements ITransactionManager {
  public readonly dataSources: GenericDataSource[] = []
  private _defaultDataSource: GenericDataSource
  private static _instance: TransactionManager = new TransactionManager();

  private constructor() { }


  addDataSource(dataSource: GenericDataSource): ITransactionManager {
    this.dataSources.push(dataSource);
    return this
  }

  setDefaultDataSource(dataSource: GenericDataSource): void {
    const defaultDataSource: GenericDataSource | undefined = this.dataSources.find(item => item === dataSource)
    if (!defaultDataSource) {
      throw new InvalidDataSourceError(`[TransactionManager][setDefaultDataSource] Invalid or non-existent DataSource`)
    }
    this._defaultDataSource = defaultDataSource
  }

  get defaultDataSource(): GenericDataSource {
    return this._defaultDataSource
  }

  public static getInstance(): TransactionManager {
    if (!TransactionManager._instance) {
      TransactionManager._instance = new TransactionManager();
    }
    return TransactionManager._instance;
  }

  public static isTypeormDataSource(dataSource: GenericDataSource): dataSource is DataSource {
    return (dataSource as DataSource).isInitialized !== undefined
  }
}


