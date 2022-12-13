import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CartItem extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  itemId: number;

  @Column()
  amount: number;

  @Column({default: null, nullable: true})
  imageUrl: string;
}
