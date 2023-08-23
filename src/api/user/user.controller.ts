import { Body, Controller, Get, Post, Req, Res, Param, Put, Delete, Query} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO, GetUsersParams, UpdateUserDTO } from './dtos/user.dto';
import { Response, query, response } from 'express';
import { get, request } from 'http';
import { UserFilterParams, UserFilterParamsWithLimits } from 'src/repositories/entities/user.entity';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    async createUser(@Body() requestBody: CreateUserDTO, @Res() res: Response) {
        const { status, ...responseData } = await this.userService.createUser(
        requestBody,
        );
        return res.status(status).json(responseData);
    }

    @Get()
    async getUsers(@Query() queryParams: GetUsersParams, @Res() res: Response){
    const {status, ...responseData} = await this.userService.findUsers(queryParams);
        return res.status(status).json(responseData);
    }

    @Get(':userId')
    async getUser(@Param('userId') userId: number, @Res() res:Response){
        const {status, ...responseData} = await this.userService.findUser(Number(userId));
        return res.status(status).json(responseData);
    }

    @Put(':userId')
    async updateUser(@Param('userId') userId: number, @Body() requestBody: UpdateUserDTO, @Res() res: Response){
        const {status, ...responseData} = await this.userService.updateUser( Number(userId), requestBody );
        return res.status(status).json(responseData);
    }

    @Delete(':userId')
    async DeleteUserParams(@Param('userId')userId: number, @Res() res: Response){
        const {status, ...responseData} = await this.userService.deleteUser(Number(userId))
        return res.status(status).json(responseData);
    }
}


