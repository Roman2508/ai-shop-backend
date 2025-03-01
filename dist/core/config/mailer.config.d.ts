import { ConfigService } from '@nestjs/config';
import { MailerOptions } from '@nestjs-modules/mailer';
export declare function getMailerConfig(configService: ConfigService): MailerOptions;
