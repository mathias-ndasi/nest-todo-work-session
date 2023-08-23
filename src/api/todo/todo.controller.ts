import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  Param,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { Response, query, response } from 'express';
import { TodoService } from './todo.service';
import { CreateTodoDto, GetTodoParams, UpdateTodoDto } from './dtos/todo.dto';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  async createTodo(@Body() requestBody: CreateTodoDto, @Res() res: Response) {
    const { status, ...responseData } = await this.todoService.createTodo(
      requestBody,
    );
    return res.status(status).json(responseData);
  }

  @Get()
  async getTodos(@Query() queryParams: GetTodoParams, @Res() res: Response) {
    const { status, ...responseData } = await this.todoService.findTodos(
      queryParams,
    );
    return res.status(status).json(responseData);
  }

  @Get(':todoId')
  async getTodo(@Param('todoId') todoId: number, @Res() res: Response) {
    const { status, ...responseData } = await this.todoService.findTodo(
      Number(todoId),
    );
    return res.status(status).json(responseData);
  }

  @Put(':todoId')
  async updateTodo(
    @Param('todoId') todoId: number,
    @Body() requestBody: UpdateTodoDto,
    @Res() res: Response,
  ) {
    const { status, ...responseData } = await this.todoService.updateTodo(
      Number(todoId),
      requestBody,
    );
    return res.status(status).json(responseData);
  }

  @Delete(':todoId')
  async deleteTodo(@Param('todoId') todoId: number, @Res() res: Response) {
    const { status, ...responseData } = await this.todoService.deleteTodo(
      Number(todoId),
    );
    return res.status(status).json(responseData);
  }
}
