import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PricesEntity, PricesSchema } from './entities/prices.entity';
import { PricesController } from './prices.controller';
import { PricesService } from './prices.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PricesEntity.name, schema: PricesSchema },
    ]),
  ],
  controllers: [PricesController],
  providers: [PricesService],
})
export class PricesModule {}
