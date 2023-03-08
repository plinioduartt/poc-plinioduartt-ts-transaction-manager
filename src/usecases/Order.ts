import { Transaction } from "../TransactionManager/decorators"
import { Order, Product, User } from "../database/typeorm/entities"
import { OrderRepository, ProductRepository, UserRepository } from "../database/typeorm/repositories"
import { CreateOrderRequest, CreateOrderResponse } from "../dtos/CreateOrder"

export class OrderUsecase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly productRepository: ProductRepository,
    private readonly orderRepository: OrderRepository,
  ) { }

  @Transaction()
  async executeWithSuccess(request: CreateOrderRequest): Promise<CreateOrderResponse> {
    const user: User = new User(request.user)
    const products: Product[] = request.products.map((product: Product) => new Product(product))
    const order: Order = new Order({ user, products })

    await this.userRepository.create(user)
    await this.productRepository.create(products)
    return await this.orderRepository.create(order)
  }

  @Transaction()
  async executeWithFailure(request: CreateOrderRequest): Promise<CreateOrderResponse> {
    const user: User = new User(request.user)
    const products: Product[] = request.products.map((product: Product) => new Product(product))
    const order: Order = new Order({ user, products })

    await this.userRepository.create(user)
    await this.productRepository.create(products)
    return await this.orderRepository.createWithFailure(order)
  }
}