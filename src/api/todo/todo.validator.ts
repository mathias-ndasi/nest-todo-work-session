import { HttpStatus, Injectable } from '@nestjs/common';
import { rejects } from 'assert';
import { resolve } from 'path';
import {
  Response,
  ResponseWithData,
  ResponseWithoutData,
} from './../../common/response';
import { GetUsersParams } from '../user/dtos/user.dto';
import { CreateTodoDto, GetTodoParams, UpdateTodoDto } from './dtos/todo.dto';
import { TodoRepository } from 'src/repositories/todo.repository';
import { UserRepository } from 'src/repositories/user.repository';
import * as Joi from 'joi';
import { JoiValidator } from 'src/utils/joi.validation.util';
import { User } from '../user/entities/user.entity';
import { Todo } from './entities/todo.entity';
import { UserType } from 'src/common/enums/constants.enum';
import { response } from 'express';

@Injectable()
export class TodoValidator {
  constructor(
    private readonly todoRepository: TodoRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async ValidateCreateTodoDto(
    dto: CreateTodoDto,
  ): Promise<ResponseWithoutData> {
    return new Promise(async (resolve, reject) => {
      try {
        //Joi validation
        const joiSchema: Joi.ObjectSchema<CreateTodoDto> = Joi.object({
          userId: Joi.number().required().label("The user's id of the todo"),
          name: Joi.string().strip().required().label("user's To do"),
          done: Joi.boolean().strip().label('Is the to do done?'),
        });

        const validateTodo = await JoiValidator.validate({
          joiSchema: joiSchema,
          data: dto,
        });

        if (validateTodo) return resolve(validateTodo);

        let user = await this.userRepository.retrieveUser({
          id: dto.userId,
        });

        if (!user) {
          return resolve(
            Response.withoutData(HttpStatus.NOT_FOUND, 'User do not exist'),
          );
        }

        let todo = await this.todoRepository.retrieveTodo({
          name: dto.name,
        });

        if (todo) {
          return resolve(Response.withoutData(HttpStatus.OK, 'Todo exist'));
        }

        todo = await this.todoRepository.retrieveTodo({
          name: dto.name,
        });

        if (todo) {
          return resolve(
            Response.withoutData(
              HttpStatus.BAD_REQUEST,
              'Todo with this name already exist',
            ),
          );
        }
        return resolve(Response.withoutData(HttpStatus.OK, 'OK'));
      } catch (error) {
        return reject(
          `An error occurred during param validation: ${JSON.stringify(dto)}`,
        );
      }
    });
  }

  async validateGeTodosParams(
    params: GetTodoParams,
  ): Promise<ResponseWithoutData> {
    return new Promise(async (resolve, reject) => {
      try {
        //joi Validation
        const joiSchema: Joi.ObjectSchema<GetTodoParams> = Joi.object({
          name: Joi.string()
            .optional()
            .trim()
            .strip()
            .email()
            .label('The name of the todo'),
          done: Joi.boolean().optional().label('is the task done?'),
          limit: Joi.number()
            .positive()
            .integer()
            .min(1)
            .optional()
            .label('The limit'),
          offset: Joi.number().positive().min(0).optional().label('The offset'),
        });

        const validationTodo = await JoiValidator.validate({
          joiSchema: joiSchema,
          data: params,
        });

        if (validationTodo) return resolve(validationTodo);

        return resolve(Response.withoutData(HttpStatus.OK, 'OK'));
      } catch (error) {
        return reject(
          `An error occurred during param validation: ${JSON.stringify(
            params,
          )}`,
        );
      }
    });
  }

  async validateGetTodoParams(todoId: number): Promise<ResponseWithData> {
    return new Promise(async (resolve, reject) => {
      try {
        const joiSchema = Joi.object({
          todoId: Joi.number().positive().integer().min(1).label('The todo ID'),
        });
        const validateGetTodo = await JoiValidator.validate({
          joiSchema: joiSchema,
          data: { todoId },
        });
        if (validateGetTodo) return resolve(validateGetTodo);

        const todo = await this.todoRepository.retrieveTodo({
          id: Number(todoId),
        });
        if (!todo) {
          return resolve(
            Response.withoutData(HttpStatus.NOT_FOUND, 'Todo not found'),
          );
        }

        return resolve(Response.withData(HttpStatus.OK, 'OK', { todo }));
      } catch (error) {
        return reject(`An error occured during param validation: ${todoId}`);
      }
    });
  }
  async validateUpdateTodoDto(
    todoId: number,
    params: UpdateTodoDto,
  ): Promise<ResponseWithoutData> {
    return new Promise(async (resolve, rejects) => {
      try {
        //joi Validation
        const joiSchema: Joi.ObjectSchema<UpdateTodoDto> = Joi.object({
          name: Joi.string().optional().trim().strip().label('The todo name'),
          done: Joi.boolean().optional().label('Is the todo done?'),
        });

        const validateTodo = await JoiValidator.validate({
          joiSchema: joiSchema,
          data: params,
        });

        if (validateTodo) return resolve(validateTodo);

        const todo = await this.todoRepository.retrieveTodo({
          id: Number(todoId),
        });

        if (!todo) {
          return resolve(
            Response.withoutData(HttpStatus.NOT_FOUND, 'todo not found'),
          );
        }

        return resolve(Response.withoutData(HttpStatus.OK, 'OK', { todo }));
      } catch (error) {
        return rejects(
          `An error occurred during param validation: ${JSON.stringify(
            params,
          )}`,
        );
      }
    });
  }

  async validateDeleteTodoParams(todoId: number): Promise<ResponseWithoutData> {
    return new Promise(async (resolve, reject) => {
      try {
        //joi Validation
        const joiSchema = Joi.object({
          todoId: Joi.number().positive().integer().min(1).label('The todo ID'),
        });
        const validateDelete = await JoiValidator.validate({
          joiSchema: joiSchema,
          data: { todoId },
        });
        if (validateDelete) return resolve(validateDelete);

        const todoData = await this.todoRepository.retrieveTodo({
          id: Number(todoId),
        });

        if (!todoData) {
          return resolve(
            Response.withoutData(HttpStatus.NOT_FOUND, 'Todo not Found'),
          );
        }
        return resolve(Response.withoutData(HttpStatus.OK, 'OK', { todoData }));
      } catch (error) {
        return reject(
          `An error occurred during param validation: ${JSON.stringify(error)}`,
        );
      }
    });
  }
}
