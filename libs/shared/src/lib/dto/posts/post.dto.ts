import { IsNotEmpty, IsUUID } from 'class-validator';

export abstract class PostDto {
  @IsNotEmpty()
  @IsUUID()
  postId!: string;
}
