import { Module } from '@nestjs/common';
import { CacheModule as NestCacheModule } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigSchema } from '@backend/core/configuration';
import redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    NestCacheModule.registerAsync({
      isGlobal: true,
      inject: [ConfigService],
      useFactory: (configService: ConfigService<ConfigSchema>) => ({
        store: redisStore,
        host: configService.get('REDIS_HOST'),
        port: configService.get('REDIS_PORT'),
        password: configService.get('REDIS_PASSWORD'),
        ...(configService.get('NODE_ENV') === 'production' && {
          tls: {
            servername: configService.get('REDIS_HOST'),
          },
        }),
      }),
    }),
  ],
  controllers: [],
  providers: [],
  exports: [NestCacheModule],
})
export class CacheModule {}
