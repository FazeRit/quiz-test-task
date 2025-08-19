import { Module } from '@nestjs/common';
import { AuthFacadeService } from '../../services/auth-facade-service/auth-facade.service';
import { AuthWriteController } from '../../controllers/auth-write-controller/auth-write.controller';
import { AuthWriteService } from '../../services/auth-write-service/auth-write.service';
import { UserModule } from 'src/modules/entities/user/user.module';
import { JwtModule } from '../../../jwt/jwt.module';
import { CustomJwtService } from '../../../jwt/services/jwt.service';
import { JwtStrategy } from '../../strategies/jwt.strategy';

@Module({
  imports: [JwtModule, UserModule],
  controllers: [AuthWriteController],
  providers: [
    AuthWriteService,
    AuthFacadeService,
    JwtStrategy,
    CustomJwtService,
  ],
  exports: [AuthWriteService, AuthFacadeService, JwtStrategy, CustomJwtService],
})
export class AuthInnerModule {}
