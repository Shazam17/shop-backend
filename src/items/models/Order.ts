import { BaseEntity, Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

export class OrderItem {
  constructor(amount: number, title: string, price: number) {
    this.amount = amount;
    this.title = title;
    this.price = price;
  }
  amount: number;

  title: string;

  get totalPrice() {
    return this.amount * this.price;
  }
  price: number;
}

@Entity()
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ type: 'json' })
  items: OrderItem[];

  @Column()
  createdByUser: number;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
