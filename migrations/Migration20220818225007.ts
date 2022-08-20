import { Migration } from '@mikro-orm/migrations';

export class Migration20220818225007 extends Migration {
  async up(): Promise<void> {
    this.addSql('drop table if exists "posts_author" cascade;');

    this.addSql('alter table "posts" add column "author_id" uuid not null;');
    this.addSql(
      'alter table "posts" add constraint "posts_author_id_foreign" foreign key ("author_id") references "users" ("id") on update cascade;'
    );
  }

  async down(): Promise<void> {
    this.addSql(
      'create table "posts_author" ("post_id" uuid not null, "user_id" uuid not null, constraint "posts_author_pkey" primary key ("post_id", "user_id"));'
    );

    this.addSql(
      'alter table "posts_author" add constraint "posts_author_post_id_foreign" foreign key ("post_id") references "posts" ("id") on update cascade on delete cascade;'
    );
    this.addSql(
      'alter table "posts_author" add constraint "posts_author_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade on delete cascade;'
    );

    this.addSql('alter table "posts" drop constraint "posts_author_id_foreign";');

    this.addSql('alter table "posts" drop column "author_id";');
  }
}
