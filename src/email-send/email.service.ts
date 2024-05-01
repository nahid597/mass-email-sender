import { Injectable } from '@nestjs/common';
import { EmailSenderDto } from 'src/dto/email.sender.dto';
import { ConfigService } from '@nestjs/config';
import MailService from 'src/common/mail.service';
import { SendEmailProducerService } from 'src/common/producer.service';

@Injectable()
export class EmailSenderService {
  constructor(
    private readonly config: ConfigService,
    private readonly mailService: MailService,
    private readonly emailSendQueue: SendEmailProducerService,
  ) {}

  getEmail(): string {
    return 'Get All new emails';
  }

  async sendMassEmails(emailSenderData: EmailSenderDto): Promise<string> {
    const emails: string = emailSenderData.emails;
    const allEmails: string[] = emails.split(',');

    for (const email of allEmails) {
      await this.emailSendQueue.addJob(email);
    }

    return 'All emails send by BullMQ automatic';
  }

  sendMailToUser(emailAddress: string) {
    console.log(emailAddress);
    console.log(this.config.get('SMTP_HOST'));

    // this.trasnporter = createTransport({
    //   host: this.config.get('SMTP_HOST'),
    //   port: 587,
    //   secure: false, // Use `true` for port 465, `false` for all other ports
    //   auth: {
    //     user: this.config.get('SMTP_USERNAME'),
    //     pass: this.config.get('SMTP_PASSWORD'),
    //   },
    // });

    //this.sendMail();
  }
}
