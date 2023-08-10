import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService){}

  create(CreateTodoDto: Prisma.TodoUncheckedCreateInput) {
    return this.prisma.todo.create({data: CreateTodoDto});
  }

  getAllTodo() {
    return this.prisma.todo.findMany();
  }

  getSingleTodo(id: number) {
    return this.prisma.todo.findUnique({where: {id}});
  }

  update(where: Prisma.TodoWhereUniqueInput, data: Prisma.TodoUpdateInput) {
    return this.prisma.todo.update({
      data,
      where,
    });
  }

  remove(id: number) {
    return this.prisma.todo.delete({where: {id}});
  }
}
