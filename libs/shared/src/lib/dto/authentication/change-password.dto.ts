import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';
import { PASSWORD_REGEX } from './authentication.dto';

export class ChangePasswordDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ default: '4sd3#5iU,&hhgcQw' })
  @Matches(PASSWORD_REGEX)
  old_password!: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ default: '4sd3#5iU,&hhgcQw' })
  @Matches(PASSWORD_REGEX)
  new_password!: string;
}
