import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from '../../jwt/types/jwt.types';
import { PassportStrategy } from '@nestjs/passport';
import { TUserWithoutPassword } from 'src/modules/entities/user/types/user.types';
import { UserReadService } from 'src/modules/entities/user/services/user-read-service/user-read.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userReadService: UserReadService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET') || 'your-secret-key',
    });
  }

  async validate(payload: JwtPayload): Promise<TUserWithoutPassword> {
    const user = await this.userReadService.findByIdSafe(payload.sub);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
