import { Entity, Enum, Formula, Index, ManyToOne, OneToMany, OneToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 } from 'uuid';
import { PostState } from '../../enums';
import { Media } from '../media';
import { User } from '../users';

@Entity({ tableName: 'posts' })
export class Post {
  @PrimaryKey({ columnType: 'uuid' })
  id = v4();

  @Index()
  @Property({ length: 300 })
  text!: string;

  @ManyToOne(() => Post, { nullable: true })
  in_reply_to?: Post | null;

  @OneToMany(() => Post, (post) => post.in_reply_to, { hidden: true })
  replies?: Post[];

  @Formula((alias) => `CAST((SELECT COUNT(*) FROM posts WHERE in_reply_to_id = ${alias}.id) AS int)`)
  reply_count?: number;

  @ManyToOne(() => User)
  author!: User;

  @ManyToOne(() => Media, { nullable: true })
  media?: Media | null;

  @Enum(() => PostState)
  state!: PostState;

  @Property({ columnType: 'timestamptz', nullable: true })
  scheduled_at?: Date | null;

  @Property({ columnType: 'timestamptz', nullable: true })
  published_at?: Date | null;

  @Property({ columnType: 'timestamptz', onCreate: () => new Date() })
  created_at?: Date = new Date();
}
