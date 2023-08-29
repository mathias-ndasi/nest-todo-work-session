import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserValidator } from "./user.validator";
import { RepositoryModule } from "../../repositories/repository.module";
import { UserController } from "./user.controller";
import { HelperModule } from "../../common/helpers/helper.module";
import { TodoValidator } from "../todo/todo.validator";

@Module({
    imports: [RepositoryModule, HelperModule],
    controllers: [UserController],
    providers: [UserService, UserValidator, TodoValidator],
})
    
export class UserModule{}
