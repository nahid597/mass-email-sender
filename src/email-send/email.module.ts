import { Module } from '@nestjs/common';
import { EmailSenderController } from './email.controller';
import { EmailSenderService } from './email.service';

@Module({
  imports: [],
  controllers: [EmailSenderController],
  providers: [EmailSenderService],
})
export class EmailSenderModule {}
