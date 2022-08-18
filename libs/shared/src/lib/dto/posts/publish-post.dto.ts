import { IsNotEmpty, IsUUID } from 'class-validator';

export class PublishPostDto {
  @IsNotEmpty()
  @IsUUID()
  postId!: string;
}
