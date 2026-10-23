import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ValidationPipe } from '@nestjs/common/pipes/index.js';
import { ConfigService } from '@nestjs/config';
import { TransformInterceptor } from './transform.interceptor.js';

//console.log(process.env.STAGE);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Get an instance of ConfigService from the Nest application container
  const configService = app.get(ConfigService);

  // Read the environment variable (e.g., FRONTEND_URL)
  const productionFrontendUrl = configService.get<string>('FRONTEND_URL_PROD');
  const developmentFrontendUrl = configService.get<string>('FRONTEND_URL_DEV');

  // Build the allowed origins array dynamically
  const allowedOrigins = [`${developmentFrontendUrl}`];

  if (productionFrontendUrl) {
    allowedOrigins.push(productionFrontendUrl);
  }

  app.enableCors({
    origin: allowedOrigins,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  const port = configService.get<number>('PORT') ?? 3000;
  await app.listen(port);
}
bootstrap();
