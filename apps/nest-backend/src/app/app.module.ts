import { Module } from '@nestjs/common';
import { CoreModule } from '@backend/core';
import { AuthenticationModule } from '@backend/feature/authentication';
import { EmailModule } from '@backend/feature/email';
import { PostsModule } from '@backend/feature/posts';
import { SearchModule } from '@backend/feature/search';
import { UsersModule } from '@backend/feature/users';

@Module({
  imports: [CoreModule, UsersModule, AuthenticationModule, EmailModule, PostsModule, SearchModule],
})
export class AppModule {}
