export type User = {
  firstName: string
  lastName: string
}

export type Product = {
  name: string
  description: string
}

export type CreateOrderRequest = {
  user: User,
  products: Product[]
}

export type CreateOrderResponse = {
  user: User,
  products: Product[]
}