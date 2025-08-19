import { ConfigModule, ConfigService } from '@nestjs/config';
import { CustomJwtService } from './services/jwt.service';
import { JwtModule as NestJwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule,
    NestJwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [CustomJwtService],
  exports: [CustomJwtService, NestJwtModule],
})
export class JwtModule {}
