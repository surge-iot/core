import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getAlertsEmbedUrl() : string {
    return process.env.ALERTS_EMBED_URL || '';
  }
}
