import { Injectable } from '@nestjs/common';
import { AddToCartDto } from '../api/dto/add-to-cart-dto';
import { CreateCommentDto } from '../api/dto/create-comment-dto';
import { CreateItemDto } from '../api/dto/create-item-dto';
import { RegisterDto } from '../api/dto/register-dto';
import { ItemRepository } from '../repositories/item.repository';
import { GetItemsDto } from '../api/dto/get-items-dto';
import { CartItem } from '../models/CartItem';

export enum ItemCategory {}

@Injectable()
export class ItemsService {
  constructor(private readonly itemsRepository: ItemRepository) {}

  deleteComment(commentId: string) {
    this.itemsRepository.deleteComment(parseInt(commentId));
  }
  createComment(itemId: string, createCommentDto: CreateCommentDto) {
    this.itemsRepository.createComment(
      parseInt(itemId),
      createCommentDto.userId,
      createCommentDto.text,
    );
  }
  getCommentByItemId(itemId: string) {
    return this.itemsRepository.getCommentByItemId(parseInt(itemId));
  }
  addToCart(addToCartDto: AddToCartDto) {
    return this.itemsRepository.addToCart(addToCartDto);
  }
  getUserCart(userId: number) {
    return this.itemsRepository.getUserCartById(userId);
  }
  removeFromCart(addToCartDto: AddToCartDto) {
    this.itemsRepository.removeFromCart(addToCartDto);
  }
  async getItemById(id: string, userId: string = null) {
    const item = await this.itemsRepository.getItemById(id);
    let cartItem: CartItem;
    if (userId) {
      cartItem = await this.itemsRepository.getCartDataItem(
        item.id,
        parseInt(userId),
      );
    }
    return { ...item, ordered: cartItem ? cartItem.amount : null };
  }
  async getAllItems(getItemsDto: GetItemsDto) {
    const items = await this.itemsRepository.getAllItems(
      getItemsDto.nameFilter,
      getItemsDto.category,
    );
    if (!getItemsDto.userId) {
      return items;
    }
    const mappedItems = await Promise.all(
      items.map(async (item) => {
        const cartItem = await this.itemsRepository.getCartDataItem(
          item.id,
          parseInt(getItemsDto.userId),
        );
        console.log(cartItem);
        return {
          ...item,
          ordered: cartItem ? cartItem.amount : null,
        };
      }),
    );
    return mappedItems;
  }

  createItem(createItemDto: CreateItemDto) {
    this.itemsRepository.createItem(createItemDto);
  }

  public async searchItems(
    title: string,
    priceFrom: number,
    priceTo: number,
    category: string,
  ) {
    this.itemsRepository.searchItems(title, priceFrom, priceTo, category);
  }

  async createOrder(userId: number, destination: string) {
    const cartItems = await this.itemsRepository.getUserCartById(userId);
    if (cartItems.items.length === 0) {
      throw new Error('no items to form order');
    }
    // @ts-ignore
    await this.itemsRepository.createOrderFromCart(
      userId,
      cartItems.items,
      destination,
    );
    await this.itemsRepository.deleteUserCart(userId);
  }

  getUserOrders(userId: number) {
    return this.itemsRepository.getUserOrders(userId);
  }

  async deleteOrder(orderId: number) {
    await this.itemsRepository.deleteOrder(orderId);
  }
}
