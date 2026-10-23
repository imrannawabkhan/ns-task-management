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

  const allowedOrigins = [
    developmentFrontendUrl
      ? developmentFrontendUrl.replace(/\/$/, '')
      : 'http://localhost:3001',
  ];

  if (productionFrontendUrl) {
    // Strip trailing slash if present
    const cleanProdUrl = productionFrontendUrl.replace(/\/$/, '');
    allowedOrigins.push(cleanProdUrl);
    console.log('IsServerActive: Prod - ' + cleanProdUrl);
  } else {
    console.log('IsServerActive: Dev');
  }

  console.log('Allowed Origins:', allowedOrigins);

  app.enableCors({
    origin: allowedOrigins,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  const port = configService.get<number>('PORT') ?? 3000;
  await app.listen(port);
}
bootstrap();
