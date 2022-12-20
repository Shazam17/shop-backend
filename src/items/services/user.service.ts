import { Injectable } from '@nestjs/common';
import { RegisterDto } from '../api/dto/register-dto';
import { ItemRepository } from '../repositories/item.repository';

@Injectable()
export class UserService {
  constructor(private readonly itemsRepository: ItemRepository) {}

  async createUser(registerDto: RegisterDto) {
    await this.itemsRepository.createUser(registerDto);
    return { success: true };
  }

  async loginUser(loginDto: RegisterDto) {
    const user = await this.itemsRepository.getUserByCredentials(loginDto);
    if (user) {
      return { success: true, userId: user.id };
    } else {
      return { success: false };
    }
  }

  async updateUser(
    userId: string,
    firstName: string,
    lastName: string,
    password: string,
  ) {
    const user = await this.itemsRepository.getUserById(parseInt(userId));
    console.log(user)
    if (user) {
      if (firstName) user.firstName = firstName;
      if (lastName) user.lastName = lastName;
      if (password) user.password = password;
      await user.save();
    } else {
      return null;
    }
  }

  getUser(number: number) {
    return this.itemsRepository.getUserById(number);
  }
}
