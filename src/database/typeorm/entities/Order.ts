import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, ManyToOne, JoinTable } from "typeorm"
import { Product } from "./Product"
import { User } from "./User"

export type OrderArgs = {
  id?: number
  products: Product[]
  user: User
}

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
    id?: number

    @ManyToMany('Product', 'orders')
    @JoinTable()
    products: Product[]

    @ManyToOne('User', 'orders')
    user: User

  constructor(args: OrderArgs) {
    this.id = args?.id
    this.products = args?.products
    this.user = args?.user
  }
}