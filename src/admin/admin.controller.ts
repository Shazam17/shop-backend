import { Body, Controller, Get, Put } from '@nestjs/common';
import { RegisterDto } from 'src/items/api/dto/register-dto';
import { ItemsService } from 'src/items/services/items.service';
import { ItemRepository } from 'src/items/repositories/item.repository';
import { CreateUserDto } from './dto/create-user-dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly items: ItemRepository) {}

  // @Put('create-user')
  // async createUser(@Body() createUserDto: RegisterDto) {
  //   this.items.createUser(createUserDto);
  // }
  //
  // @Get('all-users')
  // async getAll() {
  //   return this.items.getAll();
  // }
}
