import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateItemDto } from 'src/items/api/dto/create-item-dto';
import { ILike, Like, Repository } from 'typeorm';
import { AddToCartDto } from '../api/dto/add-to-cart-dto';
import { RegisterDto } from '../api/dto/register-dto';
import { CartItem } from '../models/CartItem';
import { Item } from '../models/Item';
import { User } from '../models/User';
import { Comment as CommentModel } from '../models/Comment';
import { Order, OrderItem } from '../models/Order';

@Injectable()
export class ItemRepository {
  getCommentByItemId(itemId: number) {
    return CommentModel.findBy({
      itemId,
    });
  }
  async deleteComment(commentId: number) {
    const comment = await CommentModel.findOneBy({ id: commentId });
    if (comment) {
      await comment.softRemove();
    }
  }
  async createComment(itemId: number, userId: number, text: string) {
    const comment = new CommentModel();
    comment.userId = userId;
    comment.itemId = itemId;
    comment.text = text;
    comment.createdAt = new Date(Date.now());
    await comment.save();
  }

  async addToCart(addToCartDto: AddToCartDto) {
    const existedItem = await CartItem.findOneBy({
      itemId: addToCartDto.itemId,
      userId: addToCartDto.userId,
    });

    if (existedItem) {
      existedItem.amount++;
      await existedItem.save();
    } else {
      const cartItem = new CartItem();
      cartItem.itemId = addToCartDto.itemId;
      cartItem.userId = addToCartDto.userId;
      cartItem.amount = 1;
      await cartItem.save();
    }
  }

  async removeFromCart(addToCartDto: AddToCartDto) {
    const existedItem = await CartItem.findOneBy({
      itemId: addToCartDto.itemId,
      userId: addToCartDto.userId,
    });

    if (existedItem.amount > 1) {
      existedItem.amount--;
      existedItem.save();
    } else {
      existedItem.softRemove();
    }
  }

  async getUserCartById(userId: number) {
    const cartItems = await CartItem.find({
      where: {
        userId,
      },
    });
    let totalPrice = 0;
    const items = await Promise.all(
      cartItems.map(async (item) => {
        const itm = await Item.findOneBy({ id: item.itemId });
        totalPrice += item.amount * itm.price;
        return {
          item: itm,
          amount: item.amount,
        };
      }),
    );

    return { items, totalPrice };
  }

  async deleteUserCart(userId: number) {
    const cartItems = await CartItem.findBy({ userId });
    await Promise.all(cartItems.map(async (item) => await item.softRemove()));
  }

  getItemById(id: string) {
    return this.itemRepository.findOneBy({
      id: parseInt(id),
    });
  }

  getAllItems(name: string, category: string) {
    let nameFilter = {};
    let categoryFilter = {};
    // console.log(name);
    if (name) {
      nameFilter = { title: ILike('%' + name + '%') };
    }
    if (category) {
      categoryFilter = { category };
    }
    return this.itemRepository.find({
      where: {
        ...nameFilter,
      },
    });
  }
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Item)
    private itemRepository: Repository<Item>,
    @InjectRepository(CartItem)
    private cartRepository: Repository<CartItem>,
  ) {}

  public getUserByCredentials(loginDto: RegisterDto) {
    return this.usersRepository.findOneBy({
      email: loginDto.email,
      password: loginDto.password,
    });
  }

  public searchItems(
    title: string,
    priceFrom: number,
    priceTo: number,
    category: string,
  ) {}

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
    await User.save(user);
  }

  public async getAll() {
    return this.usersRepository.find();
  }

  updateUser(firstName: string, lastName: string, password: string) {}

  getUserById(userId: number) {
    return User.findOneBy({ id: userId });
  }

  getCartDataItem(itemId: number, userId: number): Promise<CartItem> {
    return CartItem.findOneBy({
      itemId,
      userId,
    });
  }

  async createOrderFromCart(
    userId: number,
    cartItems: object[],
    destination: string = '',
  ) {
    const order = new Order();
    order.name = 'Новый заказ №' + Math.floor(Math.random() * 1000);
    order.createdByUser = userId;
    order.items = cartItems.map(
      // @ts-ignore
      (item) => new OrderItem(item.amount, item.item.title, item.item.price),
    );
    order.description = destination;
    await order.save();
  }

  getUserOrders(userId: number) {
    return Order.findBy({ createdByUser: userId });
  }

  async deleteOrder(orderId: number) {
    const order = await Order.findOneBy({ id: orderId });
    await order.softRemove();
  }
}
