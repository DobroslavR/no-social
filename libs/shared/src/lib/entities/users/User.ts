import {
  Collection,
  Entity,
  ManyToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { v4 } from 'uuid';

@Entity({ tableName: 'users' })
export class User {
  @PrimaryKey({ columnType: 'uuid' })
  id = v4();

  @ManyToMany(() => User)
  followers = new Collection<User>(this);

  @ManyToMany(() => User)
  following = new Collection<User>(this);

  @Property()
  first_name!: string;

  @Property()
  last_name!: string;

  @Property({ unique: true })
  username!: string;

  @Property({ unique: true })
  email!: string;

  @Property({ default: false })
  email_confirmed?: boolean;

  @Property({ hidden: true })
  salt!: string;

  @Property({ hidden: true })
  password!: string;

  @Property({ columnType: 'timestamptz', onCreate: () => new Date() })
  created_at?: Date = new Date();

  @Property({ columnType: 'timestamptz', onUpdate: () => new Date() })
  updated_at?: Date = new Date();
}
