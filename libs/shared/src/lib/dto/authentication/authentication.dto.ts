import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsNotEmpty, Matches } from 'class-validator';

export const PASSWORD_REGEX =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

export class PasswordDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ default: '4sd3#5iU,&hhgcQw' })
  @Matches(PASSWORD_REGEX)
  password!: string;
}

export class AuthenticationDto extends PasswordDto {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ default: 'dobroslav.radosavljevic@gmail.com' })
  email!: string;
}
