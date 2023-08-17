import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './authentication/auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private authService: AuthService) {}

  // Authentication
  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login (@Req() req){
    return this.authService.login(req.user)
  }

  //Authorization
  @UseGuards(AuthGuard('jwt'))
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
