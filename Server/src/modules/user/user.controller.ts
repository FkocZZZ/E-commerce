import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //api/v1/user - Get all users
  @Get()
  async getAll() {
    return await this.usersService.getAll();
  }

  //api/v1/user/:id - Get a specific user by ID
  @Get(':id')
  async getById(@Param('id') id: string) {
    return await this.usersService.getById(id);
  }

  //api/v1/user/:id - Update user information by ID
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.update(id, updateUserDto);
  }

  //api/v1/user/:id - Delete a user by ID
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.usersService.remove(id);
  }
}
