import { Options } from '@mikro-orm/core';
import { ConfigService } from '@nestjs/config';
import { ConfigSchema } from '@no-social/backend/core/configuration';
import { Post, PostComment, User } from '@no-social/shared';

const configService = new ConfigService<ConfigSchema>();

const MikroOrmConfig: Options = {
  dbName: configService.get('POSTGRES_DB'),
  user: configService.get('POSTGRES_USER'),
  password: configService.get('POSTGRES_PASSWORD'),
  host: configService.get('POSTGRES_HOST'),
  port: configService.get('POSTGRES_PORT'),
  type: 'postgresql',
  entities: [User, Post, PostComment],
  debug: true,
};

export default MikroOrmConfig;
