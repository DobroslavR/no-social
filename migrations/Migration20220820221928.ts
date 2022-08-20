import { Migration } from '@mikro-orm/migrations';

export class Migration20220820221928 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'alter table "posts" alter column "searchable_text" type tsvector using ("searchable_text"::tsvector);'
    );
    this.addSql('alter table "posts" alter column "searchable_text" drop not null;');
  }

  async down(): Promise<void> {
    this.addSql(
      'alter table "posts" alter column "searchable_text" type tsvector using ("searchable_text"::tsvector);'
    );
    this.addSql('alter table "posts" alter column "searchable_text" set not null;');
  }
}
