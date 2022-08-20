import { IsNotEmpty, IsUUID } from 'class-validator';

export class PublishPostDraftDto {
  @IsNotEmpty()
  @IsUUID()
  postId!: string;
}
