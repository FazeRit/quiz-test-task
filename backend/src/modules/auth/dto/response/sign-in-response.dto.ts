import { User } from '@prisma/client';

export class SignInResponseDto {
  user: UserResponseDto;
  message: string;
  token: string;
}

export class UserResponseDto implements Omit<User, 'password'> {
  id: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;
}
