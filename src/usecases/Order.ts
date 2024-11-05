import { OrderRepository, ProductRepository, UserRepository } from "../database/typeorm/repositories"
import { CreateOrderRequest, CreateOrderResponse } from "../dtos/CreateOrder"
import { Transactional } from 'typeorm-ez-transaction'

export class OrderUsecase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly productRepository: ProductRepository,
    private readonly orderRepository: OrderRepository,
  ) { }

  @Transactional({ logging: true })
  async executeWithSuccess(request: CreateOrderRequest): Promise<CreateOrderResponse> {
    await this.userRepository.create(request.user)
    await this.productRepository.create(request.products)
    return await this.orderRepository.create(request)
  }

  @Transactional({ logging: true })
  async executeWithFailure(request: CreateOrderRequest): Promise<CreateOrderResponse> {
    await this.userRepository.create(request.user)
    await this.productRepository.create(request.products)
    return await this.orderRepository.createWithFailure(request)
  }
}