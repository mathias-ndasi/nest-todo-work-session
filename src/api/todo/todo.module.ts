import { Module } from "@nestjs/common";
import { RepositoryModule } from "src/repositories/repository.module";
import { TodoController } from "./todo.controller";
import { TodoService } from "./todo.service";
import { TodoValidator } from "./todo.validator";


@Module({
    imports: [RepositoryModule],
    controllers: [TodoController],
    providers: [TodoService, TodoValidator]
})

export class TodoModule{}