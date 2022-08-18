import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { AuthenticationDto } from './authentication.dto';

export class SignUpDto extends AuthenticationDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  first_name!: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  last_name!: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  username!: string;
}
