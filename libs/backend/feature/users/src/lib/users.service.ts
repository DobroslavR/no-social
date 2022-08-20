import { EntityRepository, MikroORM, UseRequestContext } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Exception } from '@backend/shared';
import { SignUpDto, User } from '@shared';

interface CreateUsersProps extends SignUpDto {
  password: string;
  salt: string;
}

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: EntityRepository<User>,
    private readonly orm: MikroORM
  ) {}

  private logger = new Logger('UsersService');

  async changePassword(user: User, hashedPassword: string, salt: string) {
    user.password = hashedPassword;
    user.salt = salt;
    await this.usersRepository.persistAndFlush(user);
    return user;
  }

  async markEmailAsConfirmed(email: string) {
    const user = await this.findByEmail(email);
    user.email_confirmed = true;
    await this.usersRepository.persistAndFlush(user);
    return user;
  }

  async findByEmail(email: string) {
    this.logger.log(`Getting user with email: ${email}`);
    const user = await this.usersRepository.findOne({
      email,
    });
    if (user) {
      this.logger.log(`User with email: ${email} found`);
      return user;
    }
    this.logger.log(`User with email: ${email} not found`);
    throw new NotFoundException(Exception.USER_NOT_FOUND);
  }

  @UseRequestContext()
  async findById(id: string) {
    return this.usersRepository.findOne({ id });
  }

  async create(data: CreateUsersProps) {
    const user = this.usersRepository.create(data);
    await this.usersRepository.persistAndFlush(user);
    return user;
  }
}
