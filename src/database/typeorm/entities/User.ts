import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./Order";

export type UserArgs = {
  id?: number
  firstName: string
  lastName: string
  orders?: Order[]
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
    id?: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @OneToMany('Order', 'user')
    orders?: Order[]

  constructor(args: UserArgs) {
    this.id = args?.id
    this.firstName = args?.firstName
    this.lastName = args?.lastName
    if (args?.orders) this.orders = args?.orders
  }
}