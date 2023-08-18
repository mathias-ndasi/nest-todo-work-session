import { User } from './../api/user/entities/user.entity';
import { Injectable } from "@nestjs/common";
import { SaveUserParams } from "./entities/user.entity";
import prisma from "../common/prisma";
import { PrismaClient } from '@prisma/client';

@Injectable()
export class UserRepository {
    saveUser(params: SaveUserParams): Promise<User> {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await prisma.$transaction(async (prismaClient: PrismaClient) => {
                    
                })
            } catch (error) {
                return reject(error)
            }
        })
    }
}
