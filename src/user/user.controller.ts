import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRoles } from 'nest-access-control';
import { Role } from 'src/authorization/role.enum';
import { Roles } from 'src/authorization/roles.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Roles(Role.client)
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @Roles(Role.Admin)
  findAll() {
    return this.userService.getAllUser();
  }

  @Get(':id')
  @Roles(Role.Admin)
  @Roles(Role.client)
  findOne(@Param('id') id: string) {
    return this.userService.getSingleUser(+id);
  }

  @Put(':id')
  @Roles(Role.client)
  @Roles(Role.Admin)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update({id: +id}, updateUserDto);
  }

  @Delete(':id')
  @Roles(Role.client)
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
