import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmailSenderModule } from './email-send/email.module';
import { ConfigModule } from '@nestjs/config';
import { queueConfig, registerQueue } from './common/queue.config';
import { EmailSendProcessorService } from './common/processor.service';
import MailService from './common/mail.service';

@Module({
  imports: [
    EmailSenderModule,
    ConfigModule.forRoot(),
    queueConfig,
    registerQueue,
  ],
  controllers: [AppController],
  providers: [AppService, EmailSendProcessorService, MailService],
})
export class AppModule {}
