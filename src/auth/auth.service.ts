import { HttpStatus, Injectable } from "@nestjs/common";
import { UserService } from "../api/user/user.service";
import { CreateUserDTO, GetUsersParams } from "src/api/user/dtos/user.dto";
import { UserRepository } from "src/repositories/user.repository";
import { Response, ResponseWithData, ResponseWithoutData } from "src/common/response";
import { SaveUserParams } from "src/repositories/entities/user.entity";


@Injectable()
export class AuthService{
    constructor(
        private readonly userService: UserService,
        private readonly userRepository: UserRepository
    ) { }
    
    async signIn(params: SaveUserParams): Promise<any>{
        return new Promise(async (resolve, reject) => {
            try {
            const user = await this.userRepository.retrieveUser(params);

            if (user.password !== params.password) {
                return resolve(Response.withoutData(HttpStatus.BAD_REQUEST, 'Invalid password, please try again'))
            }
            return resolve(Response.withoutData(HttpStatus.OK, 'OK'))
                
        } catch (error) {
            return reject (`An error occured during param validatio ${JSON.stringify(error)}`)
        }
        })
    }
}