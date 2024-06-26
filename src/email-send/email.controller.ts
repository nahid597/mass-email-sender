import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { EmailSenderService } from './email.service';
import { Response } from 'express';
import { EmailSenderDto } from 'src/dto/email.sender.dto';

@Controller('email')
export class EmailSenderController {
  constructor(private readonly emailService: EmailSenderService) {}

  @Get()
  getEmails(@Res() res: Response): Response {
    return res.status(200).send(this.emailService.getEmail());
  }

  @Post()
  async sendEmails(
    @Res() res: Response,
    @Body() emailsData: EmailSenderDto,
  ): Promise<Response> {
    console.log(emailsData);
    return res
      .status(201)
      .send(await this.emailService.sendMassEmails(emailsData));
  }
}
