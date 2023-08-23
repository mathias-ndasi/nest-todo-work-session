import { HttpStatus, Injectable } from "@nestjs/common";
import { TodoValidator } from "./todo.validator";
import { CreateTodoDto, GetTodoParams, UpdateTodoDto } from "./dtos/todo.dto";
import logger from "src/utils/logger";
import { Response, ResponseWithData, ResponseWithoutData } from "./../../common/response";
import { Constants } from "src/common/enums/constants.enum";
import { TodoRepository } from "src/repositories/todo.repository";
import { HTTP_CODE_METADATA } from "@nestjs/common/constants";
import { Todo } from "./entities/todo.entity";
import { constants } from "buffer";

@Injectable()
export class TodoService{
    constructor (
        private readonly todoValidator: TodoValidator,
        private readonly todoRepository: TodoRepository
        ){}
        async createTodo(dto: CreateTodoDto){
            try {
                const validateTodo = await this.todoValidator.ValidateCreateTodoDto(dto)
                if (validateTodo.status !== HttpStatus.OK) return validateTodo;

                const todo = await this.todoRepository.saveTodo({
                    name: dto.name,
                    done: dto.done,
                });

                return Response.withData(HttpStatus.CREATED, 'Todo created successfully', todo)
            } catch (error) {
                logger.error(`An error occured when creating a new Todo: ${error}`);
                return Response.withoutData(HttpStatus.INTERNAL_SERVER_ERROR,  Constants.SERVER_ERROR);
        }
    }

    async findTodos(params: GetTodoParams): Promise<ResponseWithData>{
        try {
            const validateGetTodos = await this.todoValidator.validateGeTodosParams(params);
            if(validateGetTodos.status !== HttpStatus.OK) return validateGetTodos;

            const limit = params.limit && Number(params.limit) <= Constants.LIMIT ? Number(params.limit) : Constants.LIMIT;
            const offset = params.offset ? Number(params.offset) : Constants.OFFSET;

            let filterParams: any = {limit, offset};
            filterParams = params.name ? {...filterParams, email: params.name} : filterParams;
            filterParams = params.done? {...filterParams, username: params.done} : filterParams;

            const getTodos = await this.todoRepository.retrieveTodos(filterParams)
            return Response.withData(HttpStatus.ACCEPTED, 'All todos', getTodos)
        } catch (error) {
            logger.error(`An error occured when getting all todos: ${error}`);
            return Response.withoutData(HttpStatus.INTERNAL_SERVER_ERROR,  Constants.SERVER_ERROR);
        }
    }

    async findTodo(todoId: number): Promise<ResponseWithData> {
        try {
            const validateGetTodo = await this.todoValidator.validateGetTodoParams(todoId);
            if (validateGetTodo.status !== HttpStatus.OK) return validateGetTodo;

            const todo = validateGetTodo.data.todo as Todo
            return Response.withData(HttpStatus.OK, 'Todo retrieved successfully', todo)
        } catch (error) {
            logger.error(`An error occured when getting the Todo: ${error}`);
            return Response.withoutData(HttpStatus.INTERNAL_SERVER_ERROR, Constants.SERVER_ERROR);
        }
    }

    async updateTodo(todoId: number, dto: UpdateTodoDto): Promise<ResponseWithData> {
        try {
            
            const validateTodoUpdate = await this.todoValidator.validateUpdateTodoDto(todoId, dto)
            if (validateTodoUpdate.status !== HttpStatus.OK) return validateTodoUpdate;

            let todo = validateTodoUpdate.data.todo as Todo;
        
            todo = await this.todoRepository.UpdateTodo(todoId, {
                name: dto.name? dto.name: todo.name,
                done: dto.done? dto.done: todo.done,
            });
            
            return Response.withData(HttpStatus.FOUND, 'Todo with given id', todo)
        } catch (error) {
            logger.error(`An error occured while updating the todo: ${error}`);
            return Response.withoutData(HttpStatus.INTERNAL_SERVER_ERROR, Constants.SERVER_ERROR);
        }
    }

    async deleteTodo(todoId: number): Promise<ResponseWithoutData>{
        try {
            const deleteTodo = await this.todoValidator.validateDeleteTodoParams(todoId);
            if (deleteTodo.status !== HttpStatus.OK) return deleteTodo;

            let todo = deleteTodo.data.todo;
            todo = await this.todoRepository.deleteTodo(todoId)

            return Response.withoutData(HttpStatus.NO_CONTENT, 'Todo deleted successfully')
        } catch (error) {
            logger.error(`An error occured while deleting the todo ${error}`);
            return Response.withoutData(HttpStatus.INTERNAL_SERVER_ERROR, Constants.SERVER_ERROR);
        }
    }
}