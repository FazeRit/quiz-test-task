import { Module } from '@nestjs/common';
import { UserReadService } from '../../services/user-read-service/user-read.service';
import { UserWriteService } from '../../services/user-write-service/user-write.service';

@Module({
  providers: [UserReadService, UserWriteService],
  exports: [UserReadService, UserWriteService],
})
export class UserInnerModule {}
