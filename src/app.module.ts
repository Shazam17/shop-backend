import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemsController } from './items/items.controller';
import { ItemsService } from './items/items.service';
import { ItemsModule } from './items/items.module';
import { User } from './items/models/User';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminController } from './admin/admin.controller';
import { AdminService } from './admin/admin.service';
import { AdminModule } from './admin/admin.module';
import { Item } from './items/models/Item';
import { CartItem } from './items/models/CartItem';
import { Comment } from './items/models/Comment';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 6033,
      username: 'db_user',
      password: 'db_user_pass',
      database: 'app_db',
      entities: [
          User,
          Item,
          CartItem,
          Comment
      ],
      synchronize: true,
    }),
    ItemsModule,
    AdminModule
  ],
  controllers: [AppController, ItemsController, AdminController],
  providers: [AppService, ItemsService, AdminService],
})
export class AppModule {}
