import { Body, Controller, HttpCode, HttpStatus, Param, Post, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SaveUserParams } from "src/repositories/entities/user.entity";



@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Param('username') params: SaveUserParams) {
    return this.authService.signIn(params);
  }
}