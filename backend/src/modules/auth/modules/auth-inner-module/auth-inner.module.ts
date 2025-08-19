import { AuthFacadeService } from '../../services/auth-facade-service/auth-facade.service';
import { AuthWriteController } from '../../controllers/auth-write-controller/auth-write.controller';
import { AuthWriteService } from '../../services/auth-write-service/auth-write.service';
import { JwtModule } from '../../../jwt/jwt.module';
import { JwtStrategy } from '../../strategies/jwt.strategy';
import { Module } from '@nestjs/common';
import { UserModule } from 'src/modules/entities/user/user.module';

@Module({
  imports: [JwtModule, UserModule],
  controllers: [AuthWriteController],
  providers: [
    AuthWriteService,
    AuthFacadeService,
    JwtStrategy,
  ],
  exports: [AuthWriteService, AuthFacadeService, JwtStrategy],
})
export class AuthInnerModule {}
