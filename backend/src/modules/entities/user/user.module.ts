import { Module } from '@nestjs/common';
import { UserInnerModule } from './modules/user-inner-module/user-inner.module';

@Module({
  imports: [UserInnerModule],
  exports: [UserInnerModule],
})
export class UserModule {}
