import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  const port = process.env.PORT || 3000;

  app.use(cookieParser());

  const config = new DocumentBuilder()
    .addBearerAuth()
    .addCookieAuth()
    .setTitle('Wallet Itopia')
    .setDescription('Wallet Itopia System')
    .setVersion('1.0')
    .addTag('Login')
    .addTag('User')
    .addTag('Category')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
  console.log(console.log(`Aplicación corriendo en puerto: ${port}`));

  console.log(
    `****** Atención: Ejecutando ambiente: ${(
      process.env.NODE_ENV || 'No definido'
    ).toUpperCase()} Conectado a base de datos: ${
      process.env.DATABASE_NAME || 'No definido'
    }  ******`,
  );
}
bootstrap();
