import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(
    @Inject('TASKS') private tasks: any[],
    @Inject('API_KEY') private apiKey: string,
  ) {}

  getHello(): string {
    console.log('this.tasks: 🌟', this.tasks);
    return `Hello World! ${this.apiKey}`;
  }
}
