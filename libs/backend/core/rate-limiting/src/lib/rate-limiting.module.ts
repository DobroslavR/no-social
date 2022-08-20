import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ConfigSchema } from '@backend/core/configuration';
import { RateLimiterModule as NestRateLimiterModule } from 'nestjs-rate-limiter';
import { createClient } from 'redis';

@Module({
  imports: [
    NestRateLimiterModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService<ConfigSchema>) => ({
        type: 'Redis',
        storeClient: createClient({
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
    }),
  ],
  controllers: [],
  providers: [],
  exports: [NestRateLimiterModule],
})
export class RateLimitingModule {}
