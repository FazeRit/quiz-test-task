import { AuthWriteService } from '../auth-write-service/auth-write.service';
import { Injectable } from '@nestjs/common';
import { SignInDto } from '../../dto/request/sign-in-request.dto';
import { SignInResponseDto } from '../../dto/response/sign-in-response.dto';
import { SignUpDto } from '../../dto/request/sign-up-request.dto';
import { SignUpResponseDto } from '../../dto/response/sign-up-response.dto';

@Injectable()
export class AuthFacadeService {
  constructor(private readonly authWriteService: AuthWriteService) {}

  async signUp(signUpDto: SignUpDto): Promise<SignUpResponseDto> {
    return this.authWriteService.signUp(signUpDto);
  }

  async signIn(signInDto: SignInDto): Promise<SignInResponseDto> {
    return this.authWriteService.signIn(signInDto);
  }
}
