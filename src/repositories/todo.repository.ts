import { Injectable } from "@nestjs/common";
import { Todo } from "./../api/todo/entities/todo.entity";
import prisma from "./../common/prisma";
import { SaveTodoParams, TodoFilterParams, TodoFilterParamsWithLimits, UpdateTodoParams } from "./entities/todo.entity";


@Injectable()
export class TodoRepository{
    saveTodo(params: SaveTodoParams): Promise<Todo>{
        return new Promise(async(resolve, reject) => {
            try {
                const todo = await prisma.todo.create({
                    data: params,
                });

                return resolve(todo)
            } catch (error) {
                return reject(error)
            }
        })
    }

    retrieveTodo(params: TodoFilterParams): Promise<Todo | null>{
        return new Promise(async(resolve, reject) => {
            try {
                const todo = await prisma.todo.findFirst({
                    where: params,
                });
                return resolve(todo)
            } catch (error) {
                return reject(error)
            }
        })
    }

    retrieveTodos(params: TodoFilterParamsWithLimits): Promise<Todo[]>{
        return new Promise(async(resolve, reject) => {
            try {
                const {offset, limit, ...queryParams} = params;
                const todo = await prisma.todo.findMany({
                    where: queryParams,
                    take: limit,
                    skip: offset,
                });
                return resolve(todo)
            } catch (error) {
                return reject(error)
            }
        })
    }

    UpdateTodo(todoId: number,  params: UpdateTodoParams): Promise<Todo | null>{
        return new Promise(async(resolve, reject) => {
            try {
                const todo = await prisma.todo.update({
                    where: {id: todoId},
                    data: params,
                });
                
                return resolve(todo)
            } catch (error) {
                return reject(error)
            }
        })
    }

    deleteTodo(todoId: number): Promise<string>{
        return new Promise(async(resolve, reject) => {
            try {
                const todo = await prisma.todo.delete({
                    where: {id: todoId}
                });
                return resolve('OK')
            } catch (error) {
                return reject(error)
            }
        })
    }
}