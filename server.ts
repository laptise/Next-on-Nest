import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as express from 'express';
import { IncomingMessage, ServerResponse } from 'http';
import next from 'next';
import { AppModule } from './server/app.module';
const nextApp = next({
  dev: process.env.NODE_ENV !== 'production',
  dir: './client',
});
const handle = nextApp.getRequestHandler();
console.log(process.env.NODE_ENV);

async function bootstrap() {
  //prepare next
  await nextApp.prepare();
  //prepare nest
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const nestServer = app.getHttpAdapter();
  nestServer.use(express.static('public'));
  app.setGlobalPrefix('api');
  nestServer.all(
    '*',
    (req: IncomingMessage, res: ServerResponse<IncomingMessage>, next) => {
      if (req.url.startsWith('/api')) {
        next();
      } else {
        return handle(req, res);
      }
    },
  );
  console.log(`[Next on Nest] Listening on port :${3000}`);
  await app.listen(3000);
}

bootstrap();
