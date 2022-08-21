import { Migration } from '@mikro-orm/migrations';

export class Migration20220821124947 extends Migration {
  async up(): Promise<void> {
    this.addSql('alter table "post_comments_likes" drop constraint "post_comments_likes_post_comment_id_foreign";');

    this.addSql('drop table if exists "post_comments" cascade;');

    this.addSql('drop table if exists "post_comments_likes" cascade;');

    this.addSql('alter table "posts" add column "in_reply_to_id" uuid null;');
    this.addSql(
      'alter table "posts" add constraint "posts_in_reply_to_id_foreign" foreign key ("in_reply_to_id") references "posts" ("id") on update cascade on delete set null;'
    );
  }

  async down(): Promise<void> {
    this.addSql(
      'create table "post_comments" ("id" uuid not null, "text" varchar(300) not null, "post_id" uuid not null, "author_id" uuid not null, "created_at" timestamptz not null, constraint "post_comments_pkey" primary key ("id"));'
    );

    this.addSql(
      'create table "post_comments_likes" ("post_comment_id" uuid not null, "user_id" uuid not null, constraint "post_comments_likes_pkey" primary key ("post_comment_id", "user_id"));'
    );

    this.addSql(
      'alter table "post_comments" add constraint "post_comments_post_id_foreign" foreign key ("post_id") references "posts" ("id") on update cascade;'
    );
    this.addSql(
      'alter table "post_comments" add constraint "post_comments_author_id_foreign" foreign key ("author_id") references "users" ("id") on update cascade;'
    );

    this.addSql(
      'alter table "post_comments_likes" add constraint "post_comments_likes_post_comment_id_foreign" foreign key ("post_comment_id") references "post_comments" ("id") on update cascade on delete cascade;'
    );
    this.addSql(
      'alter table "post_comments_likes" add constraint "post_comments_likes_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade on delete cascade;'
    );

    this.addSql('alter table "posts" drop constraint "posts_in_reply_to_id_foreign";');

    this.addSql('alter table "posts" drop column "in_reply_to_id";');
  }
}
