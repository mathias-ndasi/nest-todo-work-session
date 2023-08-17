import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Roles } from 'src/authorization/roles.decorator';
import { Role } from 'src/authorization/role.enum';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  @Roles(Role.client)
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.todoService.create(createTodoDto);
  }

  @Get()
  @Roles(Role.Admin)
  findAll() {
    return this.todoService.getAllTodo();
  }

  @Get(':id')
  @Roles(Role.client)
  @Roles(Role.Admin)
  findOne(@Param('id') id: string) {
    return this.todoService.getSingleTodo(+id);
  }

  @Put(':id')
  @Roles(Role.client)
  @Roles(Role.Admin)
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.update({id: +id}, updateTodoDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  remove(@Param('id') id: string) {
    return this.todoService.remove(+id);
  }
}
