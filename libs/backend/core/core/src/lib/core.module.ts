import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ConfigurationModule } from '@backend/core/configuration';
import { DatabaseModule } from '@backend/core/database';
import { CacheModule } from '@backend/core/cache';
import { RateLimitingModule } from '@backend/core/rate-limiting';
import { AzureMediaStorageModule } from '@backend/core/azure-media-storage';

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
