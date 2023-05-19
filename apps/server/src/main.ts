import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { PrismaService } from './shared/services/prisma.service';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  // OPEN API config
  const config = new DocumentBuilder()
    .setTitle('Latin Station OPEN API')
    .setDescription('This is the open api documentation of Latin Station API REST')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  // Prisma config
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  // Cookies
  app.use(cookieParser());

  // Cors
  app.enableCors({ origin: configService.get<string>('FRONTEND_URL'), credentials: true });

  await app.listen(3001);
}
bootstrap();
