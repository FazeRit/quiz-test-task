import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';

@Injectable()
export class CustomJwtService {
  constructor(
    private readonly nestJwtService: NestJwtService,
    private readonly configService: ConfigService,
  ) {}

  generateAccessToken<T extends object>(payload: T): string {
    return this.nestJwtService.sign(payload);
  }

  verifyToken<T extends object>(token: string): T {
    return this.nestJwtService.verify<T>(token);
  }

  decodeToken<T extends object>(token: string): T | null {
    return this.nestJwtService.decode(token);
  }

  isTokenExpired(token: string): boolean {
    try {
      this.nestJwtService.verify(token);
      return false;
    } catch (error) {
      return error.name === 'TokenExpiredError';
    }
  }

  getTokenExpirationTime(token: string): Date | null {
    try {
      const decoded = this.decodeToken<{ exp: number }>(token);
      return decoded?.exp ? new Date(decoded.exp * 1000) : null;
    } catch {
      return null;
    }
  }

  getTimeUntilExpiration(token: string): number | null {
    const expirationTime = this.getTokenExpirationTime(token);
    if (!expirationTime) {
      return null;
    }

    const now = new Date();
    const timeDiff = Math.floor(
      (expirationTime.getTime() - now.getTime()) / 1000,
    );
    return timeDiff > 0 ? timeDiff : 0;
  }

  extractPayload<T extends object>(token: string): T | null {
    try {
      return this.verifyToken<T>(token);
    } catch {
      return null;
    }
  }
}
