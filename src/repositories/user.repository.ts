import { User } from './../api/user/entities/user.entity';
import { Injectable } from '@nestjs/common';
import {
  SaveUserParams,
  UpdateUserParams,
  UserFilterParams,
  UserFilterParamsWithLimits,
} from './entities/user.entity';
import prisma from '../common/prisma';
import { IUserRepository } from './interfaces/user.interface';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class UserRepository implements IUserRepository {
  saveUser(params: SaveUserParams): Promise<User> {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await prisma.user.create({
          data: params,
        });

        return resolve(user);
      } catch (error) {
        return reject(error);
      }
    });
  }

  retrieveUser(params: UserFilterParams): Promise<User | null> {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await prisma.user.findFirst({
          where: params,
        });

        return resolve(user);
      } catch (error) {
        return reject(error);
      }
    });
  }

  retrieveUsers(params: UserFilterParamsWithLimits): Promise<User[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const { offset, limit, ...queryParams } = params;
        const users = await prisma.user.findMany({
          where: queryParams,
          take: limit,
          skip: offset,
        });

        return resolve(users);
      } catch (error) {
        return reject(error);
      }
    });
  }

  updateUser(userId: number, params: UpdateUserParams): Promise<User | null> {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await prisma.user.update({
          where: { id: userId },
          data: params,
        });

        return resolve(user);
      } catch (error) {
        return reject(error);
      }
    });
  }

  deleteUser(userId: number): Promise<string> {
    return new Promise(async (resolve, reject) => {
      try {
        await prisma.$transaction(async (prismaClient: PrismaClient) => {
          await prismaClient.todo.deleteMany({ where: { userId } });
          await prismaClient.user.deleteMany({ where: { id: userId } });

          return;
        });
        return resolve('ok');
      } catch (error) {
        return reject(error);
      }
    });
  }
}
