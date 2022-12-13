import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { RegisterDto } from '../dto/register-dto';
import { UpdateUserDto } from '../dto/update-user-dto';
import { ItemsService } from '../../services/items.service';
import { UserService } from '../../services/user.service';
import { AddToCartDto } from '../dto/add-to-cart-dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly itemsService: ItemsService,
    private readonly userService: UserService,
  ) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.userService.createUser(registerDto);
  }

  @Post('login')
  async login(@Body() loginDto: RegisterDto) {
    return this.userService.loginUser(loginDto);
  }

  @Get(':id')
  async getUser(@Param('id') userId: string) {
    return this.userService.getUser(parseInt(userId));
  }

  @Post('update-user')
  async updateUser(@Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(
      updateUserDto.userId,
      updateUserDto.firstName,
      updateUserDto.lastName,
      updateUserDto.password,
    );
  }

  @Get('cart/:id')
  async getUserCart(@Param('id') userId: string) {
    return this.itemsService.getUserCart(parseInt(userId));
  }

  @Put('cart')
  async addToCart(@Body() addToCartDto: AddToCartDto) {
    return this.itemsService.addToCart(addToCartDto);
  }

  @Delete('cart')
  async removeFromCart(@Body() addToCartDto: AddToCartDto) {
    return this.itemsService.removeFromCart(addToCartDto);
  }
}
