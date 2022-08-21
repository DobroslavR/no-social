import { Migration } from '@mikro-orm/migrations';

export class Migration20220821121316 extends Migration {
  async up(): Promise<void> {
    this.addSql('drop table if exists "posts_likes" cascade;');

    this.addSql('alter table "posts" add column "media_id" uuid null;');
    this.addSql(
      'alter table "posts" add constraint "posts_media_id_foreign" foreign key ("media_id") references "media" ("id") on update cascade on delete set null;'
    );
  }

  async down(): Promise<void> {
    this.addSql(
      'create table "posts_likes" ("post_id" uuid not null, "user_id" uuid not null, constraint "posts_likes_pkey" primary key ("post_id", "user_id"));'
    );

    this.addSql(
      'alter table "posts_likes" add constraint "posts_likes_post_id_foreign" foreign key ("post_id") references "posts" ("id") on update cascade on delete cascade;'
    );
    this.addSql(
      'alter table "posts_likes" add constraint "posts_likes_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade on delete cascade;'
    );

    this.addSql('alter table "posts" drop constraint "posts_media_id_foreign";');

    this.addSql('alter table "posts" drop column "media_id";');
  }
}
