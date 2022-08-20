import {
  Collection,
  Entity,
  Enum,
  Index,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { FullTextType } from '@mikro-orm/postgresql';
import { v4 } from 'uuid';
import { PostState } from '../../enums';
import { User } from '../users';
import { PostComment } from './PostComment';

@Entity({ tableName: 'posts' })
export class Post {
  @PrimaryKey({ columnType: 'uuid' })
  id = v4();

  @Index()
  @Property({ length: 300 })
  text!: string;

  @ManyToOne(() => User)
  author!: User;

  @ManyToMany(() => User)
  likes = new Collection<User>(this);

  @OneToMany(() => PostComment, (post_comment) => post_comment.post)
  comments?: PostComment[];

  @Enum(() => PostState)
  state!: PostState;

  @Property({ columnType: 'timestamptz', nullable: true })
  scheduled_at?: Date | null;

  @Property({ columnType: 'timestamptz', nullable: true })
  published_at?: Date | null;

  @Property({ columnType: 'timestamptz', onCreate: () => new Date() })
  created_at?: Date = new Date();
}
