import { EmailService } from './email.service';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  controllers: [],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
