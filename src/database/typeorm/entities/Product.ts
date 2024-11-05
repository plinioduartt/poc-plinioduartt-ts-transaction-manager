import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm"
import { Order } from "./Order"

export type ProductArgs = {
  id?: number
  name: string
  description: string
  orders?: Order[]
}

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
    id?: number

    @Column()
    name: string

    @Column()
    description: string

    @ManyToMany('Order', 'products')
    orders?: Order[]

  constructor(args: ProductArgs) {
    this.id = args?.id
    this.name = args?.name
    this.description = args?.description
    if (args?.orders) this.orders = args?.orders
  }
}