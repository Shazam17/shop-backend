import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AddToCartDto } from './dto/add-to-cart-dto';
import { CreateCommentDto } from './dto/create-comment-dto';
import { CreateItemDto } from './dto/create-item-dto';
import { RegisterDto } from './dto/register-dto';
import { ItemsService } from './items.service';

@Controller('items')
export class ItemsController {

    constructor(
        private readonly itemsService: ItemsService
    ) {}

    @Post('register')
    async register(@Body() registerDto: RegisterDto) {
        this.itemsService.createUser(registerDto);
    }

    @Post('login')
    async login(@Body() loginDto: RegisterDto) {
        return this.itemsService.loginUser(loginDto);
    }
    
    @Put('')
    async createItem(@Body() createItemDto: CreateItemDto) {
        this.itemsService.createItem(createItemDto);
    }

    @Get('')
    async getAll() {
        return this.itemsService.getAllItems();
    }

    @Get(':id')
    async getById(
        @Param('id') id: string
    ) {
        return this.itemsService.getItemById(id);
    }

    @Get('cart/:id')
    async getUserCart(
        @Param('id') userId: string
    ) {
        return this.itemsService.getUserCart(parseInt(userId))
    }

    @Put('cart')
    async addToCart(
        @Body() addToCartDto: AddToCartDto
    ) {
        return this.itemsService.addToCart(addToCartDto);
    }

    @Delete('cart')
    async removeFromCart(@Body() addToCartDto: AddToCartDto) {
        return this.itemsService.removeFromCart(addToCartDto);
    }
    
    @Get('comments/:id')
    async getItemComments(
        @Param('id') itemId: string,
    ) {
        return this.itemsService.getCommentByItemId(itemId);
    }

    @Put('comments/:id')
    async createComment(
        @Param('id') itemId: string,
        @Body() createCommentDto: CreateCommentDto
    ) {
        this.itemsService.createComment(itemId, createCommentDto)
    }

    @Delete('comments/:id')
    async deleteComment(
        @Param('id') commentId: string,
    ) {
       this.itemsService.deleteComment(commentId) 
    } 
}
