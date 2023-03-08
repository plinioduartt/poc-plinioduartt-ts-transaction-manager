import 'reflect-metadata'
import { DataSource } from "typeorm";

export type AvailableDrives = 'typeorm'
type MetadataKeyValues = {
  key: string
  target: { value: string }
}
export const MetadataKeys = {
  typeorm: {
    key: 'TypeormDataSourceForTransactionManagerReflectMetadataKeyValue',
    target: {
      value: 'TypeormDataSourceForTransactionManagerReflectMetadataTargetValue'
    }
  }
} satisfies Record<AvailableDrives, MetadataKeyValues>

/**
 * Now, this method only accepts Typeorm DataSource. It will be improved soon to suport new DataSources
 * @param datasource Typeorm DataSource
 */
export const ConfigureTransactionManager = (datasource: DataSource) => {
  Reflect.defineMetadata(
    MetadataKeys.typeorm.key,
    datasource,
    MetadataKeys.typeorm.target
  );
}