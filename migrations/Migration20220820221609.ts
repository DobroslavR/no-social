import { Migration } from '@mikro-orm/migrations';

export class Migration20220820221609 extends Migration {
  async up(): Promise<void> {
    this.addSql('alter table "posts" add column "searchable_text" tsvector not null;');
    this.addSql('drop index "posts_text_index";');
    this.addSql('create index "posts_searchable_text_index" on "public"."posts" using gin("searchable_text");');
  }

  async down(): Promise<void> {
    this.addSql('drop index "posts_searchable_text_index";');
    this.addSql('alter table "posts" drop column "searchable_text";');
    this.addSql('create index "posts_text_index" on "public"."posts" using gin(to_tsvector(\'simple\', "text"));');
  }
}
