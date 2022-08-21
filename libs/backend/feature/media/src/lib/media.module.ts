import { MediaService } from './media.service';
import { MediaController } from './media.controller';
import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Media } from '@shared';

@Module({
  imports: [MikroOrmModule.forFeature([Media])],
  controllers: [MediaController],
  providers: [MediaService],
  exports: [],
})
export class MediaModule {}
