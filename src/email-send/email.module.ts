import { Module } from '@nestjs/common';
import { EmailSenderController } from './email.controller';
import { EmailSenderService } from './email.service';
import { ConfigService } from '@nestjs/config';
import MailService from 'src/common/mail.service';
import { registerQueue } from 'src/common/queue.config';
import { SendEmailProducerService } from 'src/common/producer.service';

@Module({
  imports: [registerQueue],
  controllers: [EmailSenderController],
  providers: [
    EmailSenderService,
    ConfigService,
    MailService,
    SendEmailProducerService,
  ],
})
export class EmailSenderModule {}
