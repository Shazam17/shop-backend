import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateCommentDto } from '../dto/create-comment-dto';
import { ItemsService } from '../../services/items.service';
import { GetItemsDto } from '../dto/get-items-dto';
import { UserService } from '../../services/user.service';

@Controller('items')
export class ItemsController {
  constructor(
    private readonly itemsService: ItemsService,
    private readonly userService: UserService,
  ) {}

  @Post('search')
  async getAll(@Body() getItemsDto: GetItemsDto) {
    return this.itemsService.getAllItems(getItemsDto);
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.itemsService.getItemById(id);
  }

  @Get('comments/:id')
  async getItemComments(@Param('id') itemId: string) {
    return this.itemsService.getCommentByItemId(itemId);
  }

  @Put('comments/:id')
  async createComment(
    @Param('id') itemId: string,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    this.itemsService.createComment(itemId, createCommentDto);
  }

  @Delete('comments/:id')
  async deleteComment(@Param('id') commentId: string) {
    this.itemsService.deleteComment(commentId);
  }

  @Get('orders/:id')
  getUserOrders(@Param('id') userId: number) {
    return this.itemsService.getUserOrders(userId);
  }

  @Put('order/:id')
  async createOrder(@Param('id') userId: number, @Body() body: { destination: string }) {
    await this.itemsService.createOrder(userId, body.destination);
  }

  @Delete('order/:orderId')
  async deleteOrder(@Param('orderId') orderId: number) {
    await this.itemsService.deleteOrder(orderId);
  }
}
