import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserValidator } from "./user.validator";
import { RepositoryModule } from "../../repositories/repository.module";
import { UserController } from "./user.controller";
import { HelperModule } from "../../common/helpers/helper.module";
import { RolesGuards } from "src/common/roles/roles.guard";
import { APP_GUARD } from "@nestjs/core";
import { UserType } from "src/common/enums/constants.enum";

@Module({
    imports: [RepositoryModule, HelperModule],
    controllers: [UserController],
    providers: [UserService, UserValidator],
})
    
export class UserModule{}
