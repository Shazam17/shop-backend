import { Injectable } from '@nestjs/common';
import { AddToCartDto } from './dto/add-to-cart-dto';
import { CreateCommentDto } from './dto/create-comment-dto';
import { CreateItemDto } from './dto/create-item-dto';
import { RegisterDto } from './dto/register-dto';
import { ItemRepository } from './repositories/item.repository';

export enum ItemCategory {

}

@Injectable()
export class ItemsService {

    constructor(
        private readonly itemsRepository: ItemRepository
    ) {}

    deleteComment(commentId: string) {
        this.itemsRepository.deleteComment(parseInt(commentId));
    }
    createComment(itemId: string, createCommentDto: CreateCommentDto) {
        this.itemsRepository.createComment(parseInt(itemId), createCommentDto.userId, createCommentDto.text);
    }
    getCommentByItemId(itemId: string) {
        return this.itemsRepository.getCommentByItemId(parseInt(itemId));
    }
    addToCart(addToCartDto: AddToCartDto) {
        this.itemsRepository.addToCart(addToCartDto);
    }
    getUserCart(userId: number) {
        return this.itemsRepository.getUserCartById(userId);
    }
    removeFromCart(addToCartDto: AddToCartDto) {
        this.itemsRepository.removeFromCart(addToCartDto)
    }
    getItemById(id: string) {
        return this.itemsRepository.getItemById(id);
    }
    getAllItems() {
        return this.itemsRepository.getAllItems();
    }

    createUser(registerDto: RegisterDto) {
        this.itemsRepository.createUser(registerDto)
    }

    createItem(createItemDto: CreateItemDto) {
        this.itemsRepository.createItem(createItemDto);
    }

    async loginUser(loginDto: RegisterDto) {
        const user = await this.itemsRepository.getUserByCredentials(loginDto);
        console.log(user)
        if(user) {
            return {success: true}
        } else {
            return {success: false}
        }
    }

    public async searchItems(
        title: string,
        priceFrom: number,
        priceTo: number,
        category: string
    ) {
        this.itemsRepository.searchItems(
            title,
            priceFrom,
            priceTo,
            category
        );
    }
}
