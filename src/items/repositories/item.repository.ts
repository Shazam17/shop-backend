import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateItemDto } from "src/items/dto/create-item-dto";
import { Repository } from "typeorm";
import { AddToCartDto } from "../dto/add-to-cart-dto";
import { RegisterDto } from "../dto/register-dto";
import { CartItem } from "../models/CartItem";
import { Item } from "../models/Item";
import { User } from "../models/User";
import {Comment as CommentModel} from '../models/Comment';

@Injectable()
export class ItemRepository {
    getCommentByItemId(itemId: number) {
        return CommentModel.findBy({
            itemId
        })
    }
    async deleteComment(commentId: number) {
        const comment = await CommentModel.findOneBy({id: commentId});
        if(comment) {
            await comment.softRemove();
        }
    }
    async createComment(itemId: number, userId: number, text: string) {
        const comment = new CommentModel()
        comment.userId = userId;
        comment.itemId = itemId;
        comment.text = text;
        comment.createdAt = new Date(Date.now());
        await comment.save();
    }

    async addToCart(addToCartDto: AddToCartDto) {

        const existedItem = await CartItem.findOneBy({
            itemId: addToCartDto.itemId,
            userId: addToCartDto.userId
        })

        if(existedItem) {
            existedItem.amount++;
            await existedItem.save();
        } else {
            const cartItem = new CartItem();
            cartItem.itemId = addToCartDto.itemId;
            cartItem.userId = addToCartDto.userId;
            cartItem.amount = 1;
            await cartItem.save()
        }
    }

    async removeFromCart(addToCartDto: AddToCartDto) {
        const existedItem = await CartItem.findOneBy({
            itemId: addToCartDto.itemId,
            userId: addToCartDto.userId
        })

        if(existedItem.amount > 1) {
            existedItem.amount--;
            existedItem.save()
        } else {
            existedItem.softRemove();
        }
    }

    async getUserCartById(userId: number) {
        const cartItems = await CartItem.find({
            where: {
                userId
            }
        });
        const items = await Promise.all(cartItems.map(async (item) => 
            {
                const itm = await Item.findOneBy({id: item.itemId});
                return {
                    item : itm,
                    amount: item.amount
                }
            }
        ));

        return items;
    }

    getItemById(id: string) {
        return this.itemRepository.findOneBy({
            id: parseInt(id)
        })
    }
    getAllItems() {
        return this.itemRepository.find();
    }
    constructor(
        @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Item)
    private itemRepository: Repository<Item>,
    @InjectRepository(CartItem)
    private cartRepository: Repository<CartItem>,
    ) {
        
    }

    public getUserByCredentials(loginDto: RegisterDto) {
        return this.usersRepository.findOneBy({
            email: loginDto.email,
            password: loginDto.password
        })
    }
    
    public searchItems(title: string, priceFrom: number, priceTo: number, category: string) {
        
    }

    public async createItem(createItemDto: CreateItemDto) {
        const item = new Item();
        item.title = createItemDto.title;
        item.price = createItemDto.price;
        item.amount = createItemDto.amount;
        item.description = createItemDto.description;
        item.category = createItemDto.category;

        await Item.save(item);
    }

    public async createUser(registerDto: RegisterDto) {
        const user = new User();
        user.email = registerDto.email;
        user.password = registerDto.password;
        await User.save(user)
    }

    public async getAll() {
        return this.usersRepository.find();
    }
 }