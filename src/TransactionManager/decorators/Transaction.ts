import 'reflect-metadata'
import { DataSource, QueryRunner } from 'typeorm';
import { MetadataKeys } from '../Configure';

/**
 * This decorator encapsulates all the method flow inside a transaction that commits in case of success and do rollback in failure cases
 * @returns 
 */
export function Transaction(): MethodDecorator {
  return function (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
    console.info(`[${target.constructor.name}][${propertyKey.toString()}] is being intercepted by Transaction decorator...`)

    const originalMethod: any = descriptor.value;
    descriptor.value = async function (...args: any) {
      const Datasource: DataSource = Reflect.getMetadata(
        MetadataKeys.typeorm.key,
        MetadataKeys.typeorm.target
      );
      const queryRunner: QueryRunner = Datasource.createQueryRunner()
      await queryRunner.connect()
      await queryRunner.startTransaction()
      console.info(`[${target.constructor.name}][${propertyKey.toString()}] transaction initialized.`)

      try {
        const result: unknown = await originalMethod.apply(this, args)
        await queryRunner.commitTransaction()
        console.info(`[${target.constructor.name}][${propertyKey.toString()}] transaction completed successfully.`)
        return result
      } catch (error: unknown) {
        console.info(`[${target.constructor.name}][${propertyKey.toString()}] has failed. Rollback realized successfully.`)
        await queryRunner.rollbackTransaction()
        throw error
      } finally {
        await queryRunner.release()
      }
    }
    return descriptor
  };
}