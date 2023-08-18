import { Injectable } from "@nestjs/common";
import { PrismaClient, Todo } from "@prisma/client";
import { promises } from "dns";
import { resolve } from "path";
import prisma from "src/common/prisma";
import { SaveTodoParams } from "./entities/todo.entity";


@Injectable()
export class TodoRepository{
    saveTodo(params: SaveTodoParams): Promise<Todo>{
        return new Promise(async(resolve, reject) => {
            try {
                const todo = await prisma.$transaction(async(prismaClient: PrismaClient) => {

                })
            } catch (error) {
                return reject(error)
            }
        })
    }
}