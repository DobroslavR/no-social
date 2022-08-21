import { v4 as uuidv4 } from 'uuid';
import { AzureStorageService, UploadedFileMetadata } from '@nestjs/azure-storage';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigSchema } from '@backend/core/configuration';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Media } from '@shared';
import { InjectRepository } from '@mikro-orm/nestjs';

@Injectable()
export class MediaService {
  constructor(
    private readonly azureStorage: AzureStorageService,
    private readonly configService: ConfigService<ConfigSchema>,
    @InjectRepository(Media)
    private mediaRepository: EntityRepository<Media>
  ) {}

  async uploadImageToAzureStorage(userId: string, file: UploadedFileMetadata) {
    file = {
      ...file,
      originalname: `${uuidv4()}.${file.originalname.split('.').pop()}`,
    };

    const url = await this.azureStorage.upload(file);

    if (!url) {
      throw new InternalServerErrorException('Upload failed');
    }

    const cdnUrl = this.configService.get('AZURE_STORAGE_CDN_URL');

    const image_url = `${cdnUrl}/${url.split('?')[0].split('/images/')[1]}`;

    const media = this.mediaRepository.create({
      url: image_url,
      author: userId,
    });

    await this.mediaRepository.persistAndFlush(media);

    return media;
  }
}
