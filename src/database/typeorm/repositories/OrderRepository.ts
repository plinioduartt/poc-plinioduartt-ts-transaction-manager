import { Repository } from "typeorm";
import { Datasource } from "../datasource";
import { Order } from "../entities";

export class OrderRepository {
  private readonly repository: Repository<Order>
  constructor() {
    this.repository = Datasource.getRepository(Order)
  }

  async create(data: Order): Promise<Order> {
    return await this.repository.save(data)
  }

  async createWithFailure(_data: Order): Promise<Order> {
    throw new Error('Simulated error')
  }
}