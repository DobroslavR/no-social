import { Migration } from '@mikro-orm/migrations';

export class Migration20220821120321 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "media" ("id" uuid not null, "url" varchar(255) not null, "author_id" uuid not null, "uploaded_at" timestamptz not null, constraint "media_pkey" primary key ("id"));'
    );

    this.addSql(
      'alter table "media" add constraint "media_author_id_foreign" foreign key ("author_id") references "users" ("id") on update cascade;'
    );

    this.addSql('drop index "posts_searchable_text_index";');
    this.addSql('alter table "posts" drop column "searchable_text";');
    this.addSql('create index "posts_text_index" on "posts" ("text");');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "media" cascade;');

    this.addSql('alter table "posts" add column "searchable_text" tsvector null;');
    this.addSql('drop index "posts_text_index";');
    this.addSql('create index "posts_searchable_text_index" on "public"."posts" using gin("searchable_text");');
  }
}
