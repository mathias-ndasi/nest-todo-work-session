import { Module } from '@nestjs/common';
import { UserModule } from 'src/api/user/user.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserRepository } from 'src/repositories/user.repository';
import { jwtConstants } from './constant';
import { HelperModule } from 'src/common/helpers/helper.module';

@Module({
  imports: [
    UserModule,
    HelperModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1000s' },
    }),
  ],
  providers: [AuthService, UserRepository],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
