import { TransactionManager } from "typeorm-ez-transaction";
import { Product } from "../entities/Product";

export class ProductRepository {
  async create(data: Product[]): Promise<Product[]> {
    const repository = TransactionManager.getManager()?.getRepository(Product)
    return await repository.save(data)
  }

  async createWithFailure(_data: Product[]): Promise<Product[]> {
    throw new Error('Simulated error')
  }
}