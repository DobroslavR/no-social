import { Migration } from '@mikro-orm/migrations';

export class Migration20220820221136 extends Migration {
  async up(): Promise<void> {
    this.addSql('create index "posts_text_index" on "public"."posts" using gin(to_tsvector(\'simple\', "text"));');
  }

  async down(): Promise<void> {
    this.addSql('drop index "posts_text_index";');
  }
}
