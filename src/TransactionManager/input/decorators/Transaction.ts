import { InvalidDataSourceError } from '../../../TransactionManager/errors';
import { TypeormHandler } from '../../../TransactionManager/handlers';
import { HandlerArgs } from '../../../TransactionManager/IOrmHandler';
import { AvailableDataSources, DataSourceTypes, GenericDataSource } from '../../ITransactionalManager';
import { TransactionManager } from '../../TransactionManager';
import pino, { DestinationStream, Logger, LoggerOptions } from 'pino'
import pretty from 'pino-pretty'

export type TransactionalOptions = {
  dataSource?: DataSourceTypes
  logging?: boolean
}

/**
 * This decorator encapsulates all the method flow inside a transaction that commits in case of success and do rollback in failure cases
 * @param dataSource 
 * @param options 
 * @returns 
 */
export function Transactional(options?: TransactionalOptions): MethodDecorator {
  const logger: Logger<LoggerOptions | DestinationStream> = pino({
    enabled: options?.logging ?? false,
  },
    pretty({
      ignore: 'req,res,pid,hostname,sid,appname,instance,release,ns,headers'
    })
  )

  return function (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
    logger.info(
      `[${target.constructor.name}][${propertyKey.toString()}] is being intercepted by Transaction decorator...`
    )

    const originalMethod: any = descriptor.value;
    descriptor.value = async function (...args: any) {
      const dataSource: GenericDataSource = options?.dataSource ?
        TransactionManager
          .getInstance()
          .dataSources.find((item) =>
            item instanceof AvailableDataSources[options.dataSource!].constructor
          )
        : TransactionManager
          .getInstance()
          .defaultDataSource

      if (!dataSource) {
        throw new InvalidDataSourceError(`[${target.constructor.name}][${propertyKey.toString()}] Invalid or non-existent DataSource`)
      }

      const handlerArgs: HandlerArgs = { dataSource, target, originalMethod, propertyKey, args, context: this, logger }

      if (TransactionManager.isTypeormDataSource(dataSource)) {
        const typeormHandler: TypeormHandler = new TypeormHandler()
        return await typeormHandler.handle(handlerArgs)
      }
    }
    return descriptor
  };
}
