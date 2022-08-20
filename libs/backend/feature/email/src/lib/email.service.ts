import { MailerSend, EmailParams, Sender, Recipient } from 'mailer-send-ts';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigSchema } from '@backend/core/configuration';

const sentFrom = new Sender('hello@logfeedy.com', 'Dobroslav from NoSocial');

@Injectable()
export class EmailService {
  constructor(private configService: ConfigService<ConfigSchema>) {}

  private logger = new Logger('EmailService');

  private mailerSendClient = new MailerSend({
    apiKey: this.configService.get('MAILER_SEND_API_KEY') as string,
  });

  async sendEmail(email: string, subject: string, text: string) {
    this.logger.log(`Sending email to ${email}`);

    const recipients = [new Recipient(email)];

    const emailParams = new EmailParams().setFrom(sentFrom).setTo(recipients).setSubject(subject).setText(text);

    const response = await this.mailerSendClient.email.send(emailParams);

    this.logger.log(`Email sent to ${email}`);

    return response;
  }
}
