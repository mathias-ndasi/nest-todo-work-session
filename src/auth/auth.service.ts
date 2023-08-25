import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from 'src/repositories/user.repository';
import { JwtService } from '@nestjs/jwt';
import { response } from 'express';
import { Response } from 'src/common/response';
import logger from 'src/utils/logger';
import { Constants } from 'src/common/enums/constants.enum';
import { UserHelper } from 'src/common/helpers/user.helper';
import { AuthUserParams } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private userHelper: UserHelper,
    private jwtService: JwtService,
  ) {}

  async signIn(/*requestBody: any*/ params: AuthUserParams) {
    try {
      const user = await this.userRepository.retrieveUser({
        username: params.username,
      });
      if (!user) {
        return Response.withoutData(HttpStatus.NOT_FOUND, 'User not found');
      }

      const isValidPassword = await this.userHelper.comparePassword(
        user,
        params.password,
      );

      if (!isValidPassword) {
        return Response.withoutData(
          HttpStatus.BAD_REQUEST,
          'Invalid credentials',
        );
      }

      const payload = { sub: user.username, user };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } catch (error) {
      logger.error(`An error occuered while getting the user: ${error}`);
      return Response.withoutData(
        HttpStatus.INTERNAL_SERVER_ERROR,
        Constants.SERVER_ERROR,
      );
    }
  }
}
