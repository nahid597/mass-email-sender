import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';

import { EMAIL_SEND_JOB, EMAIL_SEND_QUEUE } from './constants';
import { Queue } from 'bullmq';

@Injectable()
export class SendEmailProducerService {
  constructor(
    @InjectQueue(EMAIL_SEND_QUEUE) private readonly emailSendQUeue: Queue,
  ) {}

  async addJob(data: any) {
    await this.emailSendQUeue.add(
      EMAIL_SEND_JOB,
      {
        email: data,
      },
      { attempts: 3 },
    );

    console.log('job is added');
  }
}
