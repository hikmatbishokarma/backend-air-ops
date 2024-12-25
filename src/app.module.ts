import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from './configs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';
import { FlightDetailsModule } from './provider-layer/flight-details/flight-details.module';
import { PricesModule } from './provider-layer/prices/prices.module';
import { TermsAndConditionsModule } from './provider-layer/terms-and-conditions/terms-and-conditions.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: false,
      load: [config],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    RolesModule,
    UsersModule,
    FlightDetailsModule,
    PricesModule,
    TermsAndConditionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
