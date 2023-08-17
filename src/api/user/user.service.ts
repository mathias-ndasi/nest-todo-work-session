import { Constants } from './../../common/enums/constants.enum';
import { Response } from './../../common/response';
import logger from "../../utils/logger";
import { CreateUserDTO } from "./dtos/user.dto";
import { HttpStatus, Injectable } from '@nestjs/common';
import { UserValidator } from './user.validator';

@Injectable()
export class UserService {
    constructor(
        private readonly userValidator: UserValidator,
    ){}

    createUser(dto: CreateUserDTO) {
        try {

            
        } catch (error) {
            logger.error(`An error occurred when creating new user: ${error}`);
            return Response.withoutData(HttpStatus.INTERNAL_SERVER_ERROR, Constants.SERVER_ERROR);
        }
    }
}
