import { Migration } from '@mikro-orm/migrations';

export class Migration20220818223859 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'alter table "post_comments" drop constraint "post_comments_user_id_foreign";'
    );

    this.addSql(
      'alter table "posts" drop constraint "posts_author_id_unique";'
    );

    this.addSql(
      'alter table "post_comments" drop constraint "post_comments_user_id_unique";'
    );
    this.addSql(
      'alter table "post_comments" rename column "user_id" to "author_id";'
    );
    this.addSql(
      'alter table "post_comments" add constraint "post_comments_author_id_foreign" foreign key ("author_id") references "users" ("id") on update cascade;'
    );
  }

  async down(): Promise<void> {
    this.addSql(
      'alter table "post_comments" drop constraint "post_comments_author_id_foreign";'
    );

    this.addSql(
      'alter table "posts" add constraint "posts_author_id_unique" unique ("author_id");'
    );

    this.addSql(
      'alter table "post_comments" rename column "author_id" to "user_id";'
    );
    this.addSql(
      'alter table "post_comments" add constraint "post_comments_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;'
    );
    this.addSql(
      'alter table "post_comments" add constraint "post_comments_user_id_unique" unique ("user_id");'
    );
  }
}
