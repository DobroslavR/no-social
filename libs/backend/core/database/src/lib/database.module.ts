import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import MikroOrmConfig from './mikro-orm.config';

@Module({
  imports: [
    MikroOrmModule.forRoot({
      ...MikroOrmConfig,
    }),
  ],
  exports: [MikroOrmModule],
})
export class DatabaseModule {}
