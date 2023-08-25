import { Constants } from './../../common/enums/constants.enum';
import { Response, ResponseWithData, ResponseWithoutData } from './../../common/response';
import logger from "../../utils/logger";
import { CreateUserDTO, GetUsersParams, UpdateUserDTO } from "./dtos/user.dto";
import { HttpStatus, Injectable, Param } from '@nestjs/common';
import { UserValidator } from './user.validator';
import { UserRepository } from 'src/repositories/user.repository';
import { UserType } from '@prisma/client';
import { UserHelper } from 'src/common/helpers/user.helper';
import { User } from './entities/user.entity';
@Injectable()
export class UserService {
    constructor(
        private readonly userValidator: UserValidator,
        private readonly userRepository: UserRepository,
        private readonly userHelper: UserHelper,
    ){}

    async createUser(dto: CreateUserDTO): Promise<ResponseWithData> {
        try {
            const validationResults = await this.userValidator.validateCreateUserDTO(dto);
            if (validationResults.status !== HttpStatus.OK) return validationResults;

            const hashPassword = await this.userHelper.hashPassword(dto.password);
            const user = await this.userRepository.saveUser({
                username: dto.username,
                email: dto.email,
                password: hashPassword,
                userType: dto.userType as UserType,
                address: dto.address,
                firstName: dto.firstName,
                lastName: dto.lastName,
            });

            return Response.withData(HttpStatus.CREATED, 'User created successfully', user);
        } catch (error) {
            logger.error(`An error occurred when creating new user: ${error}`);
            return Response.withoutData(HttpStatus.INTERNAL_SERVER_ERROR, Constants.SERVER_ERROR);
        }
    }

    async findUsers(params: GetUsersParams): Promise <ResponseWithData> {
        try {
            const validateGetUserParams = await this.userValidator.validateGetUsersParams(params);
            if (validateGetUserParams.status !== HttpStatus.OK) return validateGetUserParams;

            const limit = params.limit && Number(params.limit) <= Constants.LIMIT ? Number(params.limit) : Constants.LIMIT;
            const offset = params.offset ? Number(params.offset) : Constants.OFFSET;

            let filterParams: any = {limit, offset};
            filterParams = params.email ? {...filterParams, email: params.email} : filterParams;
            filterParams = params.username ? {...filterParams, username: params.username} : filterParams;
            filterParams = params.userType ? {...filterParams, userType: params.userType} : filterParams;
            
            const getUsers = await this.userRepository.retrieveUsers(filterParams);
    
        return Response.withData(HttpStatus.ACCEPTED, 'All Users', getUsers);
        } catch (error) {
            logger.error(`An error occured while getting all users: ${error}`);
            return Response.withoutData(HttpStatus.INTERNAL_SERVER_ERROR, Constants.SERVER_ERROR);
        }
        
    }

    async findUser(userId: number): Promise<any> {
        try {
            const validationResult = await this.userValidator.validateGetUserParams(userId);
            if (validationResult.status !== HttpStatus.OK) return validationResult;

            const user = validationResult.data.user as User;
            
            return Response.withData(HttpStatus.OK, 'User retrieved successfully', user);
        } catch (error) {
            logger.error(`An error occuered while getting the user: ${error}`);
            return Response.withoutData(HttpStatus.INTERNAL_SERVER_ERROR, Constants.SERVER_ERROR);
        }
    }
    
    async updateUser(userId: number, dto: UpdateUserDTO): Promise <ResponseWithData>{
        try {
            const validateUpdate = await this.userValidator.validateUpdateUserDTO(userId, dto);
            if(validateUpdate.status!== HttpStatus.OK) return validateUpdate;

            let user = validateUpdate.data.user as User;
            user = await this.userRepository.updateUser(userId, {
                username: dto.username ? dto.username : user.username,
                email: dto.email? dto.email: user.email,
                userType: dto.userType? dto.userType: user.userType,
                firstName: dto.firstName? dto.firstName: user.firstName,
                lastName: dto.lastName? dto.lastName: user.lastName,
                address: dto.address? dto.address: user.address,
                password: dto.password ? await this.userHelper.hashPassword(dto.password) : user.password,

            })

            return Response.withData(HttpStatus.FOUND, 'User with given id', user)
        } catch (error) {
            logger.error(`An error occured while loading the user: ${error}`);
            return Response.withoutData(HttpStatus.INTERNAL_SERVER_ERROR, Constants.SERVER_ERROR);
        }
    }

        async deleteUser(userId: number): Promise<ResponseWithoutData>{
            try {
                const deleteUser = await this.userValidator.validateDeleteUserParams(userId);
                if(deleteUser.status!== HttpStatus.OK) return deleteUser;

                let user = deleteUser.data.user;
                user = await this.userRepository.deleteUser(userId)

                return Response.withoutData(HttpStatus.NO_CONTENT, 'User deleted successfully')
            } catch (error) {
                logger.error(`An error occured while deleting the user ${error}`);
                return Response.withoutData(HttpStatus.INTERNAL_SERVER_ERROR, Constants.SERVER_ERROR);
        }
        }
    }
