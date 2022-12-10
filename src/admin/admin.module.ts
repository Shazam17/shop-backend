import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemsModule } from 'src/items/items.module';
import { User } from 'src/items/models/User';
import { ItemRepository } from 'src/items/repositories/item.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        ItemsModule
    ]
})
export class AdminModule {}
