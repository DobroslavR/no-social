import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 } from 'uuid';
import { User } from '../users';

@Entity({ tableName: 'media' })
export class Media {
  @PrimaryKey({ columnType: 'uuid' })
  id = v4();

  @Property()
  url!: string;

  @ManyToOne(() => User)
  author!: User;

  @Property({ columnType: 'timestamptz', onCreate: () => new Date() })
  uploaded_at?: Date = new Date();
}
