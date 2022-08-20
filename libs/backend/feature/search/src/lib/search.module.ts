import { SearchService } from './search.service';
import { Module, Global } from '@nestjs/common';

@Global()
@Module({
  controllers: [],
  providers: [SearchService],
  exports: [SearchService],
})
export class SearchModule {}
