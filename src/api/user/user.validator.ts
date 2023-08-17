import { UserType } from './../../common/enums/constants.enum';
import { Response, ResponseWithoutData } from './../../common/response';
import { HttpStatus, Injectable } from "@nestjs/common";
import { CreateUserDTO, GetUserParams, UpdateUserDTO } from "./dtos/user.dto";
import Joi from 'joi';
import { JoiValidator } from '../../utils/joi.validation.util';

@Injectable()
export class UserValidator {
    async validateCreateUserDTO(dto: CreateUserDTO): Promise<ResponseWithoutData> {
        return new Promise(async (resolve, reject) => {
            try {
                // Joi validation
                const joiSchema: Joi.ObjectSchema<CreateUserDTO> = Joi.object({
                    email: Joi.string().trim().strip().email().required().label('The email'),
                    username: Joi.string().trim().required().label('The username'),
                    password: Joi.string().trim().required().label('The user password'),
                    userType: Joi.string().valid(...Object.keys(UserType)).required().label('The user type'),
                    firstName: Joi.string().trim().required().label('The first name'),
                    lastName: Joi.string().trim().required().label('The last name'),
                    address: Joi.string().trim().required().label('The user address'),
                });
                const validationResults = await JoiValidator.validate({
                    joiSchema: joiSchema,
                    data: dto,
                });

                if (validationResults) return resolve(validationResults);
                
                if (!Object.keys(UserType).includes(dto.userType.trim())) {
                    return resolve(Response.withoutData(HttpStatus.BAD_REQUEST, 'Invalid user type'));
                }
                
                return resolve(Response.withoutData(HttpStatus.OK, 'OK'));
            } catch (error) {
                return reject(`An error occurred during param validation: ${JSON.stringify(dto)}`);
            }
        })
    }

    async validateGetUserParams(params: GetUserParams): Promise<ResponseWithoutData> {
        return new Promise(async (resolve, reject) => {
            try {                
                return resolve(Response.withoutData(HttpStatus.OK, 'OK'));
            } catch (error) {
                return reject(`An error occurred during param validation: ${JSON.stringify(params)}`);
            }
        })
    }

    async validateUpdateUserDTO(params: UpdateUserDTO): Promise<ResponseWithoutData> {
        return new Promise(async (resolve, reject) => {
            try {                
                return resolve(Response.withoutData(HttpStatus.OK, 'OK'));
            } catch (error) {
                return reject(`An error occurred during param validation: ${JSON.stringify(params)}`);
            }
        })
    }
}
