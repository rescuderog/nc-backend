import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as fs from 'fs';

async function bootstrap() {
  if (process.env.HTTPS_CONFIG === "ENABLED") {
    const httpsOptions = {
      key: fs.readFileSync('./secrets/private-key.pem'),
      cert: fs.readFileSync('./secrets/public-certificate.pem'),
    };

    const app = await NestFactory.create(AppModule, {
      httpsOptions,
    });
    app.useGlobalPipes(new ValidationPipe());
    app.enableCors();
    await app.listen(3000);
  } else {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    app.enableCors();
    await app.listen(3000);
  }
}
bootstrap();
