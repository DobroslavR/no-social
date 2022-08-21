import { CookieAuthenticationGuard, UserId } from '@backend/shared';
import { UploadedFileMetadata } from '@nestjs/azure-storage';
import { Controller, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiProperty, ApiTags } from '@nestjs/swagger';
import { MediaService } from './media.service';

class FileUploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: unknown;
}

@Controller('media')
@ApiTags('Media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(CookieAuthenticationGuard)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: FileUploadDto,
  })
  async uploadImageToAzureStorage(
    @UploadedFile()
    file: UploadedFileMetadata,
    @UserId() userId: string
  ) {
    return this.mediaService.uploadImageToAzureStorage(userId, file);
  }
}
