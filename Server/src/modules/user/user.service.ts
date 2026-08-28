import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Retrieve all users from database
  async getAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  // Find a specific user by ID, throw 404 if not found
  async getById(id: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ id })
    if (!user) {
      throw new NotFoundException('Not found user')
    }
    return user;
  }

   // Update user profile information
  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.getById(id)

    const updatedUser = this.userRepository.merge(user, updateUserDto);

    return await this.userRepository.save(updatedUser);
  }

  // Delete a user from database
  async remove(id: string) {
    const user = await this.getById(id)

    await this.userRepository.remove(user);

    return { message: 'User deleted successfully!'}
  }
}
