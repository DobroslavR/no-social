import { Migration } from '@mikro-orm/migrations';

export class Migration20220818215044 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "posts" ("id" uuid not null, "text" varchar(300) not null, "author_id" uuid not null, "state" text check ("state" in (\'FAILED_TO_PUBLISH\', \'DRAFT\', \'SCHEDULED\', \'PUBLISHED\')) not null, "scheduled_at" timestamptz null, "published_at" timestamptz null, "created_at" timestamptz not null, constraint "posts_pkey" primary key ("id"));'
    );
    this.addSql(
      'alter table "posts" add constraint "posts_author_id_unique" unique ("author_id");'
    );

    this.addSql(
      'create table "posts_likes" ("post_id" uuid not null, "user_id" uuid not null, constraint "posts_likes_pkey" primary key ("post_id", "user_id"));'
    );

    this.addSql(
      'create table "post_comments" ("id" uuid not null, "text" varchar(300) not null, "post_id" uuid not null, "user_id" uuid not null, "created_at" timestamptz not null, constraint "post_comments_pkey" primary key ("id"));'
    );
    this.addSql(
      'alter table "post_comments" add constraint "post_comments_user_id_unique" unique ("user_id");'
    );

    this.addSql(
      'create table "post_comments_likes" ("post_comment_id" uuid not null, "user_id" uuid not null, constraint "post_comments_likes_pkey" primary key ("post_comment_id", "user_id"));'
    );

    this.addSql(
      'create table "users_followers" ("user_1_id" uuid not null, "user_2_id" uuid not null, constraint "users_followers_pkey" primary key ("user_1_id", "user_2_id"));'
    );

    this.addSql(
      'create table "users_following" ("user_1_id" uuid not null, "user_2_id" uuid not null, constraint "users_following_pkey" primary key ("user_1_id", "user_2_id"));'
    );

    this.addSql(
      'alter table "posts" add constraint "posts_author_id_foreign" foreign key ("author_id") references "users" ("id") on update cascade;'
    );

    this.addSql(
      'alter table "posts_likes" add constraint "posts_likes_post_id_foreign" foreign key ("post_id") references "posts" ("id") on update cascade on delete cascade;'
    );
    this.addSql(
      'alter table "posts_likes" add constraint "posts_likes_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade on delete cascade;'
    );

    this.addSql(
      'alter table "post_comments" add constraint "post_comments_post_id_foreign" foreign key ("post_id") references "posts" ("id") on update cascade;'
    );
    this.addSql(
      'alter table "post_comments" add constraint "post_comments_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;'
    );

    this.addSql(
      'alter table "post_comments_likes" add constraint "post_comments_likes_post_comment_id_foreign" foreign key ("post_comment_id") references "post_comments" ("id") on update cascade on delete cascade;'
    );
    this.addSql(
      'alter table "post_comments_likes" add constraint "post_comments_likes_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade on delete cascade;'
    );

    this.addSql(
      'alter table "users_followers" add constraint "users_followers_user_1_id_foreign" foreign key ("user_1_id") references "users" ("id") on update cascade on delete cascade;'
    );
    this.addSql(
      'alter table "users_followers" add constraint "users_followers_user_2_id_foreign" foreign key ("user_2_id") references "users" ("id") on update cascade on delete cascade;'
    );

    this.addSql(
      'alter table "users_following" add constraint "users_following_user_1_id_foreign" foreign key ("user_1_id") references "users" ("id") on update cascade on delete cascade;'
    );
    this.addSql(
      'alter table "users_following" add constraint "users_following_user_2_id_foreign" foreign key ("user_2_id") references "users" ("id") on update cascade on delete cascade;'
    );

    this.addSql(
      'alter table "users" add column "username" varchar(255) not null;'
    );
    this.addSql(
      'alter table "users" add constraint "users_username_unique" unique ("username");'
    );
  }

  async down(): Promise<void> {
    this.addSql(
      'alter table "posts_likes" drop constraint "posts_likes_post_id_foreign";'
    );

    this.addSql(
      'alter table "post_comments" drop constraint "post_comments_post_id_foreign";'
    );

    this.addSql(
      'alter table "post_comments_likes" drop constraint "post_comments_likes_post_comment_id_foreign";'
    );

    this.addSql('drop table if exists "posts" cascade;');

    this.addSql('drop table if exists "posts_likes" cascade;');

    this.addSql('drop table if exists "post_comments" cascade;');

    this.addSql('drop table if exists "post_comments_likes" cascade;');

    this.addSql('drop table if exists "users_followers" cascade;');

    this.addSql('drop table if exists "users_following" cascade;');

    this.addSql('alter table "users" drop constraint "users_username_unique";');
    this.addSql('alter table "users" drop column "username";');
  }
}
