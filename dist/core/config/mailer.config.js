"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMailerConfig = getMailerConfig;
function getMailerConfig(configService) {
    return {
        transport: {
            host: configService.getOrThrow('MAIL_HOST'),
            port: configService.getOrThrow('MAIL_PORT'),
            secure: false,
            auth: {
                user: configService.getOrThrow('MAIL_LOGIN'),
                pass: configService.getOrThrow('MAIL_PASSWORD'),
            },
        },
        defaults: {
            from: `"AI-Shop" ${configService.getOrThrow('MAIL_LOGIN')}`,
        },
    };
}
//# sourceMappingURL=mailer.config.js.map