import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { UsersService } from '@no-social/backend/feature/users';
import { Exception } from '@no-social/backend/shared';
import { ChangePasswordDto, SignInDto, User } from '@no-social/shared';
import { genSalt, hash as bcryptHash } from 'bcrypt';
import { ValidationCredentials } from '../authentication.interface';

@Injectable()
export class AuthenticationPasswordService {
  constructor(private readonly usersService: UsersService) {}

  private logger = new Logger('AuthenticationPasswordService');

  async changePassword(user: User, changePasswordDto: ChangePasswordDto) {
    this.logger.log(`Changing password for user ${user.email}`);

    const { new_password, old_password } = changePasswordDto;

    const isValidOldPassword = await this.validatePassword(user, old_password);

    if (!isValidOldPassword) {
      throw new BadRequestException(Exception.BAD_OLD_PASSWORD);
    }

    const { hashedPassword, salt } = await this.generateHashedPasswordAndSalt(
      new_password
    );

    const updatedUser = await this.usersService.changePassword(
      user,
      hashedPassword,
      salt
    );

    return updatedUser;
  }

  private async validatePassword(
    validationCredentials: ValidationCredentials,
    passwordToCheck: string
  ): Promise<boolean> {
    this.logger.log(`Validating password for user`);
    const { password, salt } = validationCredentials;
    const hashedPassword = await bcryptHash(passwordToCheck, salt);
    return hashedPassword === password;
  }

  async validateUserPassword(authCredentialsDto: SignInDto) {
    this.logger.log(`Validating user ${authCredentialsDto.email}`);
    const { email, password } = authCredentialsDto;
    const user = await this.usersService.findByEmail(email);
    if (user && (await this.validatePassword(user, password))) {
      return user;
    } else {
      return null;
    }
  }

  async generateHashedPasswordAndSalt(password: string) {
    const salt = await genSalt();

    const hashedPassword = await this.hashPassword(password, salt);

    return { salt, hashedPassword };
  }

  async hashPassword(password: string, salt: string) {
    this.logger.log(`Hashing password for user`);
    return bcryptHash(password, salt);
  }
}
