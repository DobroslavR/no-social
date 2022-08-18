import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ConfigurationModule } from '@no-social/backend/core/configuration';
import { DatabaseModule } from '@no-social/backend/core/database';
import { CacheModule } from '@no-social/backend/core/cache';
import { RateLimitingModule } from '@no-social/backend/core/rate-limiting';
import { AzureMediaStorageModule } from '@no-social/backend/core/azure-media-storage';

@Module({
  imports: [
    ConfigurationModule,
    DatabaseModule,
    CacheModule,
    RateLimitingModule,
    ScheduleModule.forRoot(),
    EventEmitterModule.forRoot(),
    AzureMediaStorageModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class CoreModule {}
