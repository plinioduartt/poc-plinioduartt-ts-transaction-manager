import { TransactionManager } from "typeorm-ez-transaction";
import { Order } from "../entities/Order";

export class OrderRepository {
  async create(data: Order): Promise<Order> {
    const repository = TransactionManager.getManager()?.getRepository(Order)
    return await repository.save(data)
  }

  async createWithFailure(_data: Order): Promise<Order> {
    throw new Error('Simulated error')
  }
}