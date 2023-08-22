import { HttpStatus, Injectable } from "@nestjs/common";
import { TodoValidator } from "./todo.validator";
import { CreateTodoDto } from "./dtos/todo.dto";
import logger from "src/utils/logger";
import { Response } from "./../../common/response";
import { Constants } from "src/common/enums/constants.enum";
import { TodoRepository } from "src/repositories/todo.repository";

@Injectable()
export class TodoServise{
    constructor (
        private readonly todoValidator: TodoValidator,
        private readonly todoRepository: TodoRepository
        ){}
        async createTodo(dto: CreateTodoDto){
            try {
                const validateTodo = await this.todoValidator.ValidateCreateTodoDto(dto)
            } catch (error) {
                logger.error(`An error occured when creating a new Todo: ${error}`);
                return Response.withoutData(HttpStatus.INTERNAL_SERVER_ERROR,  Constants.SERVER_ERROR);
        }
    }
}