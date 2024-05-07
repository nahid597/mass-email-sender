import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Transporter, createTransport, createTestAccount } from 'nodemailer';

@Injectable()
export default class MailService {
  private transporter: Transporter;
  private static instance: MailService;

  constructor(private readonly config: ConfigService) {}
  // CREATE CONNECTION FOR LOCAL
  async createLocalConnection() {
    const account = await createTestAccount();
    this.transporter = createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass,
      },
    });

    console.log('test connections successfull');
  }
  //CREATE A CONNECTION FOR LIVE
  async createConnection() {
    this.transporter = createTransport({
      service: 'gmail',
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: this.config.get('SMTP_USERNAME'),
        pass: this.config.get('SMTP_PASSWORD'),
      },
    });
  }
  //SEND MAIL
  async sendMail(options: {
    from: string;
    to: string;
    subject: string;
    text: string;
    html: string;
  }): Promise<string> {
    const info = await this.transporter.sendMail({
      from: `"Test mass email sender" <${this.config.get('SMTP_SENDER')}>`,
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html,
    });

    console.log('Message sent: %s', info.messageId);
    return 'All Emails send Successfully';
  }
  //VERIFY CONNECTION
  async verifyConnection() {
    return this.transporter.verify();
  }
  //CREATE TRANSPORTER
  getTransporter() {
    return this.transporter;
  }
}
