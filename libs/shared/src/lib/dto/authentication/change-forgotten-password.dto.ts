import { IsNotEmpty, IsString } from 'class-validator';
import { PasswordDto } from './authentication.dto';

export class ChangeForgottenPasswordDto extends PasswordDto {
  @IsString()
  @IsNotEmpty()
  token!: string;
}
