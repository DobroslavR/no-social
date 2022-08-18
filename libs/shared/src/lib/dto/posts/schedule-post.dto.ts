import { IsDateString, IsNotEmpty } from 'class-validator';
import { PostDto } from './post.dto';

export class SchedulePostDto extends PostDto {
  @IsDateString()
  @IsNotEmpty()
  scheduled_at!: string;
}
