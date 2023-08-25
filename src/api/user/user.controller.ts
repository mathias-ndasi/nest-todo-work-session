import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  Param,
  Put,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO, GetUsersParams, UpdateUserDTO } from './dtos/user.dto';
import { Response } from 'express';
import { Roles } from 'src/common/roles/roles.decorator';
import { UserType } from 'src/common/enums/constants.enum';
import { AuthGuard } from 'src/auth/auth.guard';

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
  @UseGuards(AuthGuard)
  @Roles(UserType.admin)
  async getUsers(@Query() queryParams: GetUsersParams, @Res() res: Response) {
    const { status, ...responseData } = await this.userService.findUsers(
      queryParams,
    );
    return res.status(status).json(responseData);
  }

  @Get(':userId')
  @Roles(UserType.admin, UserType.client)
  async getUser(@Param('userId') userId: number, @Res() res: Response) {
    const { status, ...responseData } = await this.userService.findUser(
      Number(userId),
    );
    return res.status(status).json(responseData);
  }

  @Put(':userId')
  @Roles(UserType.admin, UserType.client)
  async updateUser(
    @Param('userId') userId: number,
    @Body() requestBody: UpdateUserDTO,
    @Res() res: Response,
  ) {
    const { status, ...responseData } = await this.userService.updateUser(
      Number(userId),
      requestBody,
    );
    return res.status(status).json(responseData);
  }

  @Delete(':userId')
  @Roles(UserType.admin)
  async DeleteUserParams(
    @Param('userId') userId: number,
    @Res() res: Response,
  ) {
    const { status, ...responseData } = await this.userService.deleteUser(
      Number(userId),
    );
    return res.status(status).json(responseData);
  }
}
