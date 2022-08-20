import { Module } from '@nestjs/common';
import { CoreModule } from '@no-social/backend/core';
import { AuthenticationModule } from '@no-social/backend/feature/authentication';
import { EmailModule } from '@no-social/backend/feature/email';
import { PostsModule } from '@no-social/backend/feature/posts';
import { SearchModule } from '@no-social/backend/feature/search';
import { UsersModule } from '@no-social/backend/feature/users';

@Module({
  imports: [
    CoreModule,
    UsersModule,
    AuthenticationModule,
    EmailModule,
    PostsModule,
    SearchModule,
  ],
})
export class AppModule {}
