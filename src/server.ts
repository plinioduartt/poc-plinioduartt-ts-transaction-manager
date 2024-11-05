import express, { Express, Request, Response } from 'express';
import { Datasource, InitDatabase } from './database/typeorm/datasource';
import { OrderRepository, ProductRepository, UserRepository } from './database/typeorm/repositories';
import { CreateOrderRequest } from './dtos/CreateOrder';
import { OrderUsecase } from './usecases/Order';
import { TransactionManager } from 'typeorm-ez-transaction'

const Port = 8000
const App: Express = express()
App.use(express.json())

InitDatabase()

/**
* Transaction manager initialization
*/
TransactionManager.setDatasource(Datasource)
/**
* Transaction manager initialization end
*/

const userRepository = new UserRepository()
const productRepository = new ProductRepository()
const orderRepository = new OrderRepository()
const orderUsecase = new OrderUsecase(userRepository, productRepository, orderRepository)

App.post('/orders/success', async (request: Request, response: Response) => {
  try {
    const result = await orderUsecase.executeWithSuccess(request.body as CreateOrderRequest)
    return response.status(200).json(result)
  } catch (error: unknown) {
    return response.status(400).json({
      error: (error as Error).message,
      stack: (error as Error).stack
    })
  }
})

App.post('/orders/failure', async (request: Request, response: Response) => {
  try {
    const result = await orderUsecase.executeWithFailure(request.body as CreateOrderRequest)
    return response.status(200).json(result)
  } catch (error: unknown) {
    return response.status(400).json({
      error: (error as Error).message,
      stack: (error as Error).stack
    })
  }
})

App.listen(Port, () => {
  console.log(`Server listening to port ${Port}`)
})