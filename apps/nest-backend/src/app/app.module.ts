import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { CoreModule } from '@backend/core';
import { AuthenticationModule } from '@backend/feature/authentication';
import { EmailModule } from '@backend/feature/email';
import { PostsModule } from '@backend/feature/posts';
import { SearchModule } from '@backend/feature/search';
import { UsersModule } from '@backend/feature/users';
import { MediaModule } from '@backend/feature/media';
import { TimelineModule } from '@backend/feature/timeline';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { FollowModule } from '@backend/feature/follow';

@Module({
  imports: [
    CoreModule,
    UsersModule,
    AuthenticationModule,
    TimelineModule,
    EmailModule,
    MediaModule,
    PostsModule,
    SearchModule,
    FollowModule,
  ],
})
export class AppModule {}
