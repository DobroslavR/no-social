import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export abstract class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(300)
  text!: string;
}
