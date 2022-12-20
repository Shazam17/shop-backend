import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItem } from './models/CartItem';
import { Comment } from './models/Comment';
import { Item } from './models/Item';
import { User } from './models/User';
import { ItemRepository } from './repositories/item.repository';
import { UserService } from './services/user.service';
import { Order } from './models/Order';

@Module({
  imports: [TypeOrmModule.forFeature([User, Item, CartItem, Comment, Order])],
  exports: [ItemRepository],
  providers: [ItemRepository, UserService],
})
export class ItemsModule {}
