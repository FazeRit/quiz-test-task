import { User } from '@prisma/client';

export class SignUpResponseDto {
  user: UserResponseDto;
  message: string;
}

export class UserResponseDto implements Omit<User, 'password'> {
  id: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;
}
