import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigSchema } from '@no-social/backend/core/configuration';

@Module({
  imports: [
    BullModule.forRootAsync({
      useFactory: async (configService: ConfigService<ConfigSchema>) => ({
        redis: {
          host: configService.get('REDIS_HOST'),
          port: Number(configService.get('REDIS_PORT')),
          password: configService.get('REDIS_PASSWORD'),
          ...(configService.get('NODE_ENV') === 'production' && {
            tls: {
              servername: configService.get('REDIS_HOST'),
            },
          }),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [BullModule],
})
export class QueueModule {}
