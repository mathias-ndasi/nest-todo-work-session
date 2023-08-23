import { Module } from "@nestjs/common";
import { RepositoryModule } from "src/repositories/repository.module";
import { TodoController } from "./todo.controller";
import { TodoService } from "./todo.service";
import { TodoValidator } from "./todo.validator";
import { RolesGuards } from "src/common/roles/roles.guards";


@Module({
    imports: [RepositoryModule],
    controllers: [TodoController],
    providers: [TodoService, TodoValidator, RolesGuards]
})

export class TodoModule{}