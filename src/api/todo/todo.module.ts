import { Module } from "@nestjs/common";
import { RepositoryModule } from "src/repositories/repository.module";
import { TodoController } from "./todo.controller";
import { UserService } from "../user/user.service";
import { TodoServise } from "./todo.service";
import { TodoValidator } from "./todo.validator";


@Module({
    imports: [RepositoryModule],
    controllers: [TodoController],
    providers: [TodoServise, TodoValidator]
})

export class TodoModule{}