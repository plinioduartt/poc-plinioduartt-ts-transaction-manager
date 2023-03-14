import pino, { DestinationStream, Logger, LoggerOptions } from 'pino'
import { GenericDataSource } from "./ITransactionalManager";

export type HandlerArgs = {
  dataSource: Exclude<GenericDataSource, undefined>,
  target: any,
  originalMethod: any,
  propertyKey: string | symbol,
  args: any,
  context: PropertyDescriptor
  logger: Logger<LoggerOptions | DestinationStream> 
}
export interface IOrmHandler {
  handle(args: HandlerArgs): Promise<unknown>
}