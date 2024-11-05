import { TransactionManager } from "typeorm-ez-transaction";
import { User } from "../entities/User";

export class UserRepository {
  async create(data: User): Promise<User> {
    const entityManager = TransactionManager.getManager()
    const repository = entityManager?.getRepository(User)
    return await repository.save(data)
  }

  async createWithFailure(_data: User): Promise<User> {
    throw new Error('Simulated error')
  }
}