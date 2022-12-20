import {
  // ConfigService,
  ConfigType,
} from '@nestjs/config';
import { Injectable, Inject } from '@nestjs/common';
import configuration from './config/configuration';

@Injectable()
export class AppService {
  constructor(
    // @Inject('TASKS') private tasks: any[],
    // private config: ConfigService,
    @Inject('API_KEY') private apiKey: string,
    @Inject(configuration.KEY)
    private configService: ConfigType<typeof configuration>,
  ) {}

  getHello(): string {
    // console.log('this.tasks: 🌟', this.tasks);

    // const apiKey = this.configService.get<string>('API_KEY');
    // const dbName = this.configService.get<string>('DATABASE_NAME');
    // const dbPort = this.configService.get<number>('DATABASE_PORT');

    // console.log('apiKey:', apiKey);
    // console.log('dgName:', dbName);
    // console.log('dbPort:', dbPort);

    const apiKey = this.configService.apiKey;
    const dbName = this.configService.database.name;
    const dbPort = this.configService.database.port;

    const db = this.configService.database;
    console.log('db:', db); // db: { name: 'my_db', port: '9876' }

    return `Hello World! 🦄
    - this.apiKey: ${this.apiKey}
    - apiKey: ${apiKey}
    - dbName: ${dbName}
    - dbPort: ${dbPort}
    `;
  }
}
