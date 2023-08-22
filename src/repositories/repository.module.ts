import { Module } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { TodoRepository } from "./todo.repository";

@Module({
    imports: [],
    providers: [UserRepository, TodoRepository],
    exports: [UserRepository, TodoRepository],
})
export class RepositoryModule{}
