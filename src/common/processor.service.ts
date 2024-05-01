import { Processor, WorkerHost, OnWorkerEvent } from '@nestjs/bullmq';
import { EMAIL_SEND_QUEUE } from './constants';
import { Job } from 'bullmq';
import { Injectable, Logger } from '@nestjs/common';
import MailService from './mail.service';

@Injectable()
@Processor(EMAIL_SEND_QUEUE)
export class EmailSendProcessorService extends WorkerHost {
  private readonly logger = new Logger(EmailSendProcessorService.name);

  constructor(private readonly mailService: MailService) {
    super();
  }

  async process(job: Job<any, any, string>): Promise<any> {
    console.log('processing the job', job.data.email);

    await this.mailService.createConnection();

    await this.mailService.sendMail({
      from: 'nahidh597@gmail.com',
      to: job.data.email,
      subject: 'Mass-email send from Nahid Hasan',
      text: 'This is test email. so do not freak out. This email auto send by BullMQ',
      html: '<b>This is test email. so do not freak out. This email auto sends by BullMQ</b>',
    });
  }

  @OnWorkerEvent('completed')
  onCompleted(job: any) {
    this.logger.log('task completed by worker', JSON.stringify(job.id));
  }

  @OnWorkerEvent('failed')
  onFailed(job: any) {
    this.logger.error(
      'Worker cannot complete the task',
      JSON.stringify(job.failedReason),
    );
  }
}
