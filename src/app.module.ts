import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from './config/configuration';
import { enviroments } from './config/enviroments';
import { UsersModule } from './modules/users/users.module';
import { ProductsModule } from './modules/products/products.module';
import { HttpService, HttpModule } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { DatabaseModule } from './modules/database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV],
      load: [configuration],
      isGlobal: true,
      validationSchema: Joi.object({
        API_KEY: Joi.string().required(),
        DATABASE_NAME: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
      }),
    }),
    HttpModule,
    UsersModule,
    ProductsModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'TASKS',
      useFactory: async (http: HttpService) => {
        const todosUrl = 'https://jsonplaceholder.typicode.com/todos';
        const tasks = await firstValueFrom(
          http.get(todosUrl, {
            headers: {
              'Accept-Encoding': '',
              // 'Accept-Encoding': 'gzip,deflate,compress',
              // 'content-type': 'application/x-www-form-urlencoded',
            },
          }),
        );

        // * Trae mayor información
        // console.log('tasks:', tasks);

        return tasks.data;

        // ! @Deprecated
        // const tasks = await http
        //   .get('https://jsonplaceholder.typicode.com/todos', {
        //     headers: {
        //       'Accepted-Encoding': 'gzip,deflatte,compress',
        //     },
        //   })
        //   .toPromise();

        // return tasks.data;
      },
      inject: [HttpService],
    },
  ],
})
export class AppModule {}
