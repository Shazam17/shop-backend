import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ItemsController } from './items/api/controllers/items.controller';
import { ItemsService } from './items/services/items.service';
import { ItemsModule } from './items/items.module';
import { User } from './items/models/User';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminController } from './admin/admin.controller';
import { AdminService } from './admin/admin.service';
import { AdminModule } from './admin/admin.module';
import { Item } from './items/models/Item';
import { CartItem } from './items/models/CartItem';
import { Comment } from './items/models/Comment';
import { UserService } from './items/services/user.service';
import { UsersController } from './items/api/controllers/users.controller';
import { Order } from './items/models/Order';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 6033,
      username: 'db_user',
      password: 'db_user_pass',
      database: 'app_db',
      entities: [User, Item, CartItem, Comment, Order],
      synchronize: true,
    }),
    ItemsModule,
    AdminModule,
  ],
  controllers: [ItemsController, AdminController, UsersController],
  providers: [AppService, ItemsService, AdminService, UserService],
})
export class AppModule {}
