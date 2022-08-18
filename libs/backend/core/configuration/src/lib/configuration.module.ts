import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import Joi from 'joi';

export interface ConfigSchema {
  // Application
  PORT: number;
  // Postgres
  POSTGRES_HOST: string;
  POSTGRES_PORT: number;
  POSTGRES_USER: string;
  POSTGRES_PASSWORD: string;
  POSTGRES_DB: string;
  POSTGRES_DB_SYNC: boolean;
  POSTGRES_SSL: boolean;
  // Session
  SESSION_SECRET: string;
  SESSION_MAX_AGE: number;
  // Redis
  REDIS_HOST: string;
  REDIS_PORT: number;
  REDIS_PASSWORD: string;
  // Email
  EMAIL_CONFIRMATION_URL: string;
  // Forgot password
  FORGOT_PASSWORD_URL: string;
  // EMAIL JWT
  JWT_EMAIL_VERIFICATION_TOKEN_SECRET: string;
  JWT_EMAIL_VERIFICATION_TOKEN_EXPIRATION_TIME: number;
  // FORGOT PASSWORD JWT
  JWT_FORGOT_PASSWORD_VERIFICATION_TOKEN_SECRET: string;
  JWT_FORGOT_PASSWORD_VERIFICATION_TOKEN_EXPIRATION_TIME: number;
  // MailerSend
  MAILER_SEND_API_KEY: string;
  // Client
  CLIENT_URL: string;
  // Env
  NODE_ENV: string;
}

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().positive(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB_SYNC: Joi.boolean(),
        POSTGRES_DB: Joi.string().required(),
        POSTGRES_SSL: Joi.boolean(),
        PORT: Joi.number().positive(),
        SESSION_SECRET: Joi.string().required(),
        SESSION_MAX_AGE: Joi.number().positive(),
        REDIS_HOST: Joi.string().required(),
        REDIS_PORT: Joi.number().positive(),
        REDIS_PASSWORD: Joi.string().optional(),
        EMAIL_CONFIRMATION_URL: Joi.string().required(),
        JWT_EMAIL_VERIFICATION_TOKEN_SECRET: Joi.string().required(),
        JWT_EMAIL_VERIFICATION_TOKEN_EXPIRATION_TIME: Joi.number().positive(),
        JWT_FORGOT_PASSWORD_VERIFICATION_TOKEN_SECRET: Joi.string().required(),
        JWT_FORGOT_PASSWORD_VERIFICATION_TOKEN_EXPIRATION_TIME:
          Joi.number().positive(),
        MAILER_SEND_API_KEY: Joi.string().required(),
        CLIENT_URL: Joi.string().required(),
        FORGOT_PASSWORD_URL: Joi.string().required(),
        NODE_ENV: Joi.string().valid('development', 'production'),
      }),
    }),
  ],
  controllers: [],
  providers: [],
  exports: [ConfigModule],
})
export class ConfigurationModule {}
