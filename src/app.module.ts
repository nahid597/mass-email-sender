import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmailSenderModule } from './email-send/email.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [EmailSenderModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
