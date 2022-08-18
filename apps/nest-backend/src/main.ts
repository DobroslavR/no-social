import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import session from 'express-session';
import helmet from 'helmet';
import passport from 'passport';
import { createClient } from 'redis';
import createRedisStore from 'connect-redis';
import { AppModule } from './app/app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigSchema } from '@no-social/backend/core/configuration';

const SWAGGER_UI_PATH = 'docs';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: { credentials: true, origin: process.env.CLIENT_URL },
  });

  app.set('trust proxy', 1);

  app.useGlobalPipes(new ValidationPipe());

  app.use(helmet());

  const configService: ConfigService<ConfigSchema> = app.get(ConfigService);

  const RedisStore = createRedisStore(session);

  const redisClient = createClient({
    host: configService.get('REDIS_HOST'),
    port: configService.get('REDIS_PORT'),
    password: configService.get('REDIS_PASSWORD'),
    ...(configService.get('NODE_ENV') === 'production' && {
      tls: {
        servername: configService.get('REDIS_HOST'),
      },
    }),
  });

  const sessionMiddleware = session({
    store: new RedisStore({ client: redisClient }),
    secret: configService.get('SESSION_SECRET'),
    resave: false,
    saveUninitialized: false,
    name: 'sessionId',
    cookie: {
      sameSite: configService.get('NODE_ENV') === 'production' ? 'none' : 'lax',
      secure: configService.get('NODE_ENV') === 'production',
      httpOnly: true,
      maxAge: configService.get('SESSION_MAX_AGE'),
    },
  });

  app.use(sessionMiddleware);

  app.use(passport.initialize());
  app.use(passport.session());

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  const port = process.env.PORT;

  if (process.env.NODE_ENV === 'development') {
    const config = new DocumentBuilder()
      .setTitle('NoSocial API')
      .setDescription('The NoSocial API description')
      .setVersion('1.0')
      .addCookieAuth('sessionId')
      .build();

    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup(SWAGGER_UI_PATH, app, document, {
      swaggerOptions: { persistAuthorization: true },
    });

    Logger.log(
      `🚀 SwaggerUI is running on: http://localhost:${port}/${SWAGGER_UI_PATH}`
    );
  }

  Logger.log(`🚀 Application is running on: http://localhost:${port}/`);

  await app.listen(port);
}

bootstrap();
