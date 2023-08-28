import { UserType } from './../../common/enums/constants.enum';
import { Response, ResponseWithData, ResponseWithoutData } from './../../common/response';
import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDTO, GetUsersParams, UpdateUserDTO } from './dtos/user.dto';
import { JoiValidator } from '../../utils/joi.validation.util';
import { config } from '../../common/config';
import * as Joi from 'joi';
import { UserRepository } from '../../repositories/user.repository';
import { UpdateUserParams } from 'src/repositories/entities/user.entity';

@Injectable()
export class UserValidator {
  constructor(private readonly userRepository: UserRepository) {}

  async validateCreateUserDTO(
    dto: CreateUserDTO,
  ): Promise<ResponseWithoutData> {
    return new Promise(async (resolve, reject) => {
      try {
        
        // Joi validation
        const joiSchema: Joi.ObjectSchema<CreateUserDTO> = Joi.object({
          email: Joi.string()
            .trim()
            .strip()
            .email()
            .required()
            .label('The email'),
          username: Joi.string().trim().required().label('The username'),
          password: Joi.string().trim().required().label('The user password'),
          userType: Joi.string()
            .valid(...Object.keys(UserType))
            .required()
            .label('The user type'),
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
          return resolve(
            Response.withoutData(HttpStatus.BAD_REQUEST, 'Invalid user type'),
          );
        }

        let existingUser = await this.userRepository.retrieveUser({
          username: dto.username,
        });
  
        if (existingUser) {
          return resolve(
            Response.withoutData(
              HttpStatus.BAD_REQUEST,
              'User with this name already exists',
            ),
          );
        }

        existingUser = await this.userRepository.retrieveUser({
          email: dto.email,
        });

    
        if (existingUser) {
          return resolve(
            Response.withoutData(
              HttpStatus.BAD_REQUEST,
              'User with this email already exists',
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

  async validateGetUsersParams(
    params: GetUsersParams,
  ): Promise<ResponseWithoutData> {
    return new Promise(async (resolve, reject) => {
      try {
        //joi Validation
        const joiSchema: Joi.ObjectSchema<GetUsersParams> = Joi.object({
          email: Joi.string()
            .optional()
            .trim()
            .strip()
            .email()
            .label('The Email'),
          username: Joi.string().optional().trim().label('The username'),
          userType: Joi.string()
            .valid(...Object.keys(UserType))
            .optional()
            .label('The user type'),
          limit: Joi.number()
            .positive()
            .integer()
            .min(1)
            .optional()
            .label('The limit'),
          offset: Joi.number()
            .positive()
            .integer()
            .min(0)
            .optional()
            .label('The offset'),
        });
        const validationResults = await JoiValidator.validate({
          joiSchema: joiSchema,
          data: params,
        });

        if (validationResults) return resolve(validationResults);

        if (
          params.userType &&
          !Object.keys(UserType).includes(params.userType.trim())
        ) {
          return resolve(
            Response.withoutData(HttpStatus.BAD_REQUEST, 'Invalid user type'),
          );
        }

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

  async validateGetUserParams(userId: number): Promise<ResponseWithData> {
    return new Promise(async (resolve, reject) => {
      try {
        //joi Validation
        const joiSchema = Joi.object({
          userId: Joi.number().positive().integer().min(1).label('The user ID'),
        });
        const validationResults = await JoiValidator.validate({
          joiSchema: joiSchema,
          data: { userId },
        });

        if (validationResults) return resolve(validationResults);

        const user = await this.userRepository.retrieveUser({
          id: Number(userId),
        });
        if (!user) {
          return resolve(
            Response.withoutData(HttpStatus.NOT_FOUND, 'User not found'),
          );
        }

        return resolve(Response.withData(HttpStatus.OK, 'OK', { user }));
      } catch (error) {
        return reject(`An error occurred during param validation: ${userId}`);
      }
    });
  }

  async validateUpdateUserDTO(
    userId: number,
    params: UpdateUserDTO,
  ): Promise<ResponseWithoutData> {
    return new Promise(async (resolve, reject) => {
      try {
        //joi Validation
        const joiSchema: Joi.ObjectSchema<UpdateUserDTO> = Joi.object({
          email: Joi.string()
            .trim()
            .strip()
            .email()
            .optional()
            .label('The email'),
          username: Joi.string().trim().optional().label('The username'),
          firstName: Joi.string()
            .trim()
            .optional()
            .label('The user first name'),
          lastName: Joi.string().trim().optional().label('The user last name'),
          address: Joi.string().trim().optional().label('The user address'),
          password: Joi.string().trim().optional().label('The user password'),
          userType: Joi.string()
            .valid(...Object.keys(UserType))
            .optional()
            .label('The user type'),
        });

        const validationResults = await JoiValidator.validate({
          joiSchema: joiSchema,
          data: params,
        });
        if (validationResults) return resolve(validationResults);

        const user = await this.userRepository.retrieveUser({
            id: Number(userId)
        });
        if (!user) {
          return resolve(
            Response.withoutData(HttpStatus.NOT_FOUND, 'User not Found'),
          );
        }
      
        return resolve(Response.withoutData(HttpStatus.OK, 'OK', { user }));
      } catch (error) {
        return reject(
          `An error occurred during param validation: ${JSON.stringify(
            params,
          )}`,
        );
      }
    });
  }

  async validateDeleteUserParams(
    userId: number,
  ): Promise<ResponseWithoutData> {
    return new Promise(async (resolve, reject) => {
      try {
        //joi Validation
        
        const joiSchema = Joi.object({
            userId: Joi.number().positive().integer().min(1).label('The user ID'),
        });
  
          const validationResults = await JoiValidator.validate({
            joiSchema: joiSchema,
            data: { userId },
          });

        if (validationResults) return resolve(validationResults);

        const userData= await this.userRepository.retrieveUser({
            id: Number(userId)
        });
    
        if (!userData) {
          return resolve(
            Response.withoutData(HttpStatus.NOT_FOUND, 'User not Found'),
          );
        }
        return resolve(Response.withoutData(HttpStatus.OK, 'OK', { userData }));
      } catch (error) {
        return reject(
          `An error occurred during param validation: ${JSON.stringify(userId)}`,
        );
      }
    });
  }

}
