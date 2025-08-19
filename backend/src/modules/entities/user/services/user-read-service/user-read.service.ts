import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/services/prisma.service';
import { TUserWithoutPassword } from '../../types/user.types';
import { User } from '@prisma/client';

@Injectable()
export class UserReadService {
  constructor(private readonly prisma: PrismaService) {}

  async findByUsername(username: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { username },
    });
  }

  async findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async findByIdOrThrow(id: string): Promise<User> {
    const user = await this.findById(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async findByUsernameOrThrow(username: string): Promise<User> {
    const user = await this.findByUsername(username);
    if (!user) {
      throw new NotFoundException(`User with username ${username} not found`);
    }
    return user;
  }

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  exists(id: string): Promise<boolean> {
    return this.prisma.user
      .findUnique({ where: { id } })
      .then((user) => !!user);
  }

  excludePassword(user: User): TUserWithoutPassword {
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async findByUsernameSafe(
    username: string,
  ): Promise<TUserWithoutPassword | null> {
    const user = await this.findByUsername(username);
    return user ? this.excludePassword(user) : null;
  }

  async findByIdSafe(id: string): Promise<TUserWithoutPassword | null> {
    const user = await this.findById(id);
    return user ? this.excludePassword(user) : null;
  }
}
