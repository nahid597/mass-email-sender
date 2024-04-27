import { Injectable } from '@nestjs/common';
import { EmailSenderDto } from 'src/dto/email.sender.dto';

@Injectable()
export class EmailSenderService {
  getEmail(): string {
    return 'Get All new emails';
  }

  sendMassEmails(emailSenderData: EmailSenderDto): string {
    const emails: string = emailSenderData.emails;
    const allEmails: string[] = emails.split(',');

    for (const email of allEmails) {
      console.log(email);
    }

    return 'Mass Emails send successfully';
  }
}
