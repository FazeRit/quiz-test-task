import { AuthFacadeService } from '../../services/auth-facade-service/auth-facade.service';
import { Body, Controller, Post } from '@nestjs/common';
import { SignInDto } from '../../dto/request/sign-in-request.dto';
import { SignInResponseDto } from '../../dto/response/sign-in-response.dto';
import { SignUpDto } from '../../dto/request/sign-up-request.dto';
import { SignUpResponseDto } from '../../dto/response/sign-up-response.dto';
import { Public } from '../../../../shared/decorators/public.decorator';

@Controller('auth')
export class AuthWriteController {
  constructor(private readonly facade: AuthFacadeService) {}

  @Post('sign-up')
  @Public()
  async signUp(@Body() signUpDto: SignUpDto): Promise<SignUpResponseDto> {
    return this.facade.signUp(signUpDto);
  }

  @Post('sign-in')
  @Public()
  async signIn(@Body() signInDto: SignInDto): Promise<SignInResponseDto> {
    return this.facade.signIn(signInDto);
  }
}
