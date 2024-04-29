import { Injectable } from '@nestjs/common';
import { EmailSenderDto } from 'src/dto/email.sender.dto';
import { ConfigService } from '@nestjs/config';
import MailService from 'src/common/mail.service';

@Injectable()
export class EmailSenderService {
  constructor(
    private readonly config: ConfigService,
    private readonly mailService: MailService,
  ) {}

  getEmail(): string {
    return 'Get All new emails';
  }

  async sendMassEmails(emailSenderData: EmailSenderDto): Promise<string> {
    const emails: string = emailSenderData.emails;
    const allEmails: string[] = emails.split(',');

    for (const email of allEmails) {
      console.log(email);
    }

    await this.mailService.createConnection();

    const res = await this.mailService.sendMail({
      from: 'nahidh597@gmail.com',
      to: 'test.nahid.56@yopmail.com',
      subject: 'Mass-email send from Nahid Hasan',
      text: 'THis is test email. so do not freak out',
      html: '<b>THis is test email html part. We can skip it </b>',
    });

    return res;
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
