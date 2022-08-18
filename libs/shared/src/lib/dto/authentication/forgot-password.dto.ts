import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ForgotPasswordDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ default: 'dobroslav.radosavljevic@gmail.com' })
  email!: string;
}
