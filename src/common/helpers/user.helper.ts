import { Injectable } from '@nestjs/common';
import { config } from '../config';
import { User } from 'src/api/user/entities/user.entity';
import logger from '../../utils/logger';
const bcrypt = require('bcrypt');

@Injectable()
export class UserHelper {
  async hashPassword(password: string): Promise<string> {
    try {
      const hashPassword = await bcrypt.hash(password, config.bcryptHashRound);
      return hashPassword;
    } catch (error) {
      throw new Error(`An error occurred when hashing passord: ${error}`);
    }
  }

  async comparePassword(user: User, password: string): Promise<boolean> {
    try {
      const isValidPassword = await bcrypt.compare(password, user.password);
      return isValidPassword;
    } catch (error) {
      logger.error(error);
      return false;
    }
  }
}
