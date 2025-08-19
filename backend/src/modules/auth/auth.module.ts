import { AuthFacadeService } from './services/auth-facade-service/auth-facade.service';
import { AuthInnerModule } from './modules/auth-inner-module/auth-inner.module';
import { AuthWriteService } from './services/auth-write-service/auth-write.service';
import { JwtModule } from '../jwt/jwt.module';
import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/modules/prisma.module';
import { UserModule } from '../entities/user/user.module';

@Module({
  imports: [AuthInnerModule, UserModule, PrismaModule, JwtModule],
  providers: [AuthWriteService, AuthFacadeService],
  exports: [AuthWriteService],
})
export class AuthModule {}
