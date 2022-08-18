import { Migration } from '@mikro-orm/migrations';

export class Migration20220818162633 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "users" ("id" uuid not null, "first_name" varchar(255) not null, "last_name" varchar(255) not null, "email" varchar(255) not null, "email_confirmed" boolean not null default false, "salt" varchar(255) not null, "password" varchar(255) not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, constraint "users_pkey" primary key ("id"));'
    );
    this.addSql(
      'alter table "users" add constraint "users_email_unique" unique ("email");'
    );
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "users" cascade;');
  }
}
