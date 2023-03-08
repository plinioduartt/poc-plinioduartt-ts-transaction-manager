import { Repository } from "typeorm";
import { Datasource } from "../datasource";
import { Product } from "../entities";

export class ProductRepository {
  private readonly repository: Repository<Product>
  constructor() {
    this.repository = Datasource.getRepository(Product)
  }

  async create(data: Product[]): Promise<Product[]> {
    return await this.repository.save(data)
  }

  async createWithFailure(_data: Product[]): Promise<Product[]> {
    throw new Error('Simulated error')
  }
}