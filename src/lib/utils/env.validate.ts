import { Transform, plainToClass } from 'class-transformer';
import {
  IsArray,
  IsIP,
  IsNumber,
  IsString,
  validateSync,
} from 'class-validator';

class EnvironmentVariables {
  @IsNumber()
  APP_PORT: number;

  @IsString()
  DB_HOST: string;

  @IsNumber()
  DB_PORT: number;

  @IsString()
  DB_USERNAME: string;

  @IsString()
  DB_PASSWORD: string;

  @IsString()
  DB_DATABASE: string;

  @IsString()
  SLACK_WEBHOOK_URL: string;

  @IsString()
  JWT_SECRET_KEY: string;

  @IsNumber()
  JWT_EXPIRES_IN: number;

  @IsNumber()
  JWT_REFRESH_EXPIRES_IN: number;

  @IsString()
  MAIL_HOST: string;

  @IsNumber()
  MAIL_PORT: number;

  @IsString()
  MAIL_AUTH_USER: string;

  @IsString()
  MAIL_AUTH_PASS: string;

  @Transform(({ value }) => (value ? value.split(',') : []))
  @IsArray()
  @IsIP(4, { each: true })
  ADMIN_ALLOW_IPS: string;
}

export const validateEnvironment = (config: Record<string, unknown>) => {
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  console.log(validatedConfig);
  return validatedConfig;
};
