import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserValidator } from "./user.validator";
import { RepositoryModule } from "../../repositories/repository.module";
import { UserController } from "./user.controller";
import { HelperModule } from "../../common/helpers/helper.module";
import { RolesGuards } from "src/common/roles/roles.guards";

@Module({
    imports: [RepositoryModule, HelperModule],
    controllers: [UserController],
    providers: [UserService, UserValidator, RolesGuards]
})
export class UserModule{}
