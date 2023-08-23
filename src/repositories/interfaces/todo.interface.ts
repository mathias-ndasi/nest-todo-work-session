import {
  SaveTodoParams,
  UpdateTodoParams,
  TodoFilterParams,
  TodoFilterParamsWithLimits,
} from '../entities/todo.entity';

export interface ITodoRepository {
  saveTodo(params: SaveTodoParams): Promise<any>;
  retrieveTodo(params: TodoFilterParams): Promise<any>;
  retrieveTodos(params: TodoFilterParamsWithLimits): Promise<any>;
  updateTodo(userId: number, params: UpdateTodoParams): Promise<any>;
  deleteTodo(userId: number): Promise<any>;
}
