import { Global, Module } from '@nestjs/common';
import { AzureStorageModule, AzureStorageOptions } from '@nestjs/azure-storage';

const storageConfigFactory = async (): Promise<AzureStorageOptions> => ({
  sasKey: process.env['AZURE_STORAGE_SAS_KEY'],
  accountName: process.env['AZURE_STORAGE_ACCOUNT'] as string,
  containerName: process.env['AZURE_STORAGE_CONTAINER_NAME'] as string,
});

@Global()
@Module({
  imports: [
    AzureStorageModule.withConfigAsync({
      useFactory: storageConfigFactory,
    }),
  ],
  exports: [AzureStorageModule],
})
export class AzureMediaStorageModule {}
