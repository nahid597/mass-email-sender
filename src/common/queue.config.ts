import { BullModule } from '@nestjs/bullmq';
import { EMAIL_SEND_QUEUE } from './constants';

export const queueConfig = BullModule.forRoot({
  connection: {
    host: 'localhost',
    port: 6379,
  },
});

export const registerQueue = BullModule.registerQueue({
  name: EMAIL_SEND_QUEUE,
  connection: {
    host: '0.0.0.0',
    port: 6379,
  },
});
