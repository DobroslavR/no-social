import {
  Collection,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { v4 } from 'uuid';
import { User } from '../users';
import { Post } from './Post';

@Entity({ tableName: 'post_comments' })
export class PostComment {
  @PrimaryKey({ columnType: 'uuid' })
  id = v4();

  @Property({ length: 300 })
  text!: string;

  @ManyToMany(() => User)
  likes = new Collection<User>(this);

  @ManyToOne(() => Post)
  post!: Post;

  @ManyToOne(() => User)
  author!: User;

  @Property({ columnType: 'timestamptz', onCreate: () => new Date() })
  created_at?: Date;
}
