import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from 'src/common/decorators/role.decorator';
import { UserRole } from './entities/user.entity';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //GET api/v1/user - Get all users
  @Get()
  async getAll() {
    return await this.usersService.getAll();
  }

  //GET api/v1/user/:id - Get a specific user by ID
  @Get(':id')
  async getById(@Param('id') id: string) {
    return await this.usersService.getById(id);
  }

  //PATCH api/v1/user/:id - Update user information by ID
  @Patch(':id')
  @Roles(UserRole.ADMIN)
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.update(id, updateUserDto);
  }

  //DELETE api/v1/user/:id - Delete a user by ID
  @Delete(':id')
  @Roles(UserRole.ADMIN)
  async remove(@Param('id') id: string) {
    return await this.usersService.remove(id);
  }
}
