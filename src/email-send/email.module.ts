import { Module } from '@nestjs/common';
import { EmailSenderController } from './email.controller';
import { EmailSenderService } from './email.service';
import { ConfigService } from '@nestjs/config';
import MailService from 'src/common/mail.service';

@Module({
  imports: [],
  controllers: [EmailSenderController],
  providers: [EmailSenderService, ConfigService, MailService],
})
export class EmailSenderModule {}
