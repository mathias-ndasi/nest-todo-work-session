import { Module } from "@nestjs/common";
import { UserModule } from "src/api/user/user.module";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UserRepository } from "src/repositories/user.repository";



@Module({
    imports: [UserModule],
    providers: [AuthService, UserRepository],
    controllers: [AuthController],
})

export class AuthModule{}