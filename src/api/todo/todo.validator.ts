import { HttpStatus, Injectable } from "@nestjs/common";
import { rejects } from "assert";
import { resolve } from "path";
import { ResponseWithoutData } from "src/common/response";
import { CreateTodoDto, GetTodoParams, UpdateTodoDto } from "./dtos/todo.dto";
import Joi from "joi";
import { JoiValidator } from "src/utils/joi.validation.util";


@Injectable()
export class TodoValidator{
    async ValidateCreateTodoDto(dto: CreateTodoDto): Promise<ResponseWithoutData> {
        return new Promise(async (resolve, reject) => {
            try {
                
                //Joi validation
                const joiSchema: Joi.ObjectSchema<CreateTodoDto> = Joi.object({
                    name: Joi.string().strip(). required().label("user's To do"),
                    done: Joi.boolean().strip().label("Is the to do done?"),
                });
                const validateTodo = await JoiValidator.validate({
                    joiSchema:joiSchema,
                    data: dto,
                });

            if (validateTodo) return resolve(validateTodo);
            } catch (error) {
                return reject(`An error occurred during param validation: ${JSON.stringify(dto)}`);
            }
        });
    }

    async validateGeTodoParams(params: GetTodoParams): Promise<ResponseWithoutData> {
        return new Promise(async (resolve, reject) => {
            try {       
                
                //joi Validation
                const joiSchema: Joi.ObjectSchema<GetTodoParams> = Joi.object({
                    name: Joi.string().required().trim().strip().email().label('The name'),
                    done: Joi.boolean().required().label('is the task done'),
                });
            } catch (error) {
                return reject(`An error occurred during param validation: ${JSON.stringify(params)}`);
            }
        })
    }

    async validateUpdateTodoDto (params: UpdateTodoDto): Promise<ResponseWithoutData>{
        return new Promise(async (resolve, rejects) => {

            try {       
                
                //joi Validation
                const joiSchema: Joi.ObjectSchema<GetTodoParams> = Joi.object({
                    name: Joi.string().optional().trim().strip().email().label('The Email'),
                    done: Joi.boolean().optional().label('The username'),
                });
            } catch (error) {'joi'
                return rejects(`An error occurred during param validation: ${JSON.stringify(params)}`);
            }
        })
    }

}