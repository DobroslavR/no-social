import { Entity, Enum, Index, ManyToOne, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 } from 'uuid';
import { PostState } from '../../enums';
import { Media } from '../media';
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

  @ManyToOne(() => Media, { nullable: true })
  media?: Media | null;

  @OneToMany(() => PostComment, (post_comment) => post_comment.post, { hidden: true })
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
