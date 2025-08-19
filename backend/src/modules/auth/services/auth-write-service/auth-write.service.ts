import * as bcrypt from 'bcryptjs';
import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtPayload } from '../../../jwt/types/jwt.types';
import { SignInDto } from '../../dto/request/sign-in-request.dto';
import { SignInResponseDto } from '../../dto/response/sign-in-response.dto';
import { SignUpDto } from '../../dto/request/sign-up-request.dto';
import { SignUpResponseDto } from '../../dto/response/sign-up-response.dto';
import { UserReadService } from 'src/modules/entities/user/services/user-read-service/user-read.service';
import { UserWriteService } from 'src/modules/entities/user/services/user-write-service/user-write.service';
import { CustomJwtService } from '../../../jwt/services/jwt.service';

@Injectable()
export class AuthWriteService {
  constructor(
    private readonly userReadService: UserReadService,
    private readonly userWriteService: UserWriteService,
    private readonly customJwtService: CustomJwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<SignUpResponseDto> {
    const { username, password } = signUpDto;

    const existingUser = await this.userReadService.findByUsername(username);

    if (existingUser) {
      throw new ConflictException('User with this username already exists');
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await this.userWriteService.createUser({
      username,
      password: hashedPassword,
    });

    const { password: _, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      message: 'User registered successfully',
    };
  }

  async signIn(signInDto: SignInDto): Promise<SignInResponseDto> {
    const { username, password } = signInDto;

    const user = await this.userReadService.findByUsername(username);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = {
      sub: user.id,
      username: user.username,
    };

    const token = this.customJwtService.generateAccessToken(payload);
    const { password: _, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      message: 'Login successful',
      token,
    };
  }
}
