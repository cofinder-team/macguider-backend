import { Module, Provider } from '@nestjs/common';
import { S3Service } from './s3.service';
import { S3Client } from '@aws-sdk/client-s3';
import { ConfigModule, ConfigService } from '@nestjs/config';

const S3ClientProvider: Provider<S3Client> = {
  provide: 'S3_CLIENT',
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    return new S3Client({
      region: configService.get<string>('S3_REGION'),
      credentials: {
        accessKeyId: configService.get<string>('S3_AUTH_USER'),
        secretAccessKey: configService.get<string>('S3_AUTH_PASS'),
      },
    });
  },
};

const S3BucketProvider: Provider<string> = {
  provide: 'S3_BUCKET',
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    return configService.get<string>('S3_BUCKET');
  },
};

@Module({
  imports: [ConfigModule],
  providers: [S3ClientProvider, S3BucketProvider, S3Service],
  exports: [S3Service],
})
export class S3Module {}
