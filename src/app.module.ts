import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from './configs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';
import { FlightInfoModule } from './provider-layer/quotations/flight-info/flight-info.module';
import { PricesModule } from './provider-layer/quotations/prices/prices.module';
import { TermsAndConditionsModule } from './provider-layer/quotations/terms-and-conditions/terms-and-conditions.module';
import { QuotationsModule } from './consumer-layer/quotations/quotations.module';
import { FlightDetailsModule } from './provider-layer/operations/flight-details/flight-details.module';

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
    FlightInfoModule,
    PricesModule,
    TermsAndConditionsModule,
    QuotationsModule,
    FlightDetailsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
