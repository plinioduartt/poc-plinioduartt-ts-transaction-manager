import { Repository } from "typeorm";
import { Datasource } from "../datasource";
import { User } from "../entities";

export class UserRepository {
  private readonly repository: Repository<User>
  constructor() {
    this.repository = Datasource.getRepository(User)
  }

  async create(data: User): Promise<User> {
    return await this.repository.save(data)
  }

  async createWithFailure(_data: User): Promise<User> {
    throw new Error('Simulated error')
  }
}