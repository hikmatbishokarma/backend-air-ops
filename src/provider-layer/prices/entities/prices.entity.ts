import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { BaseEntity } from 'src/common/entities/base.entity';

export class PricesEntity extends BaseEntity {
  @Prop({ type: Number })
  basePrice: number;
  @Prop({ type: Number })
  duration: number;
  @Prop({ type: Number })
  groundHandlingChanrge: number;
  @Prop({ type: Number })
  crewBeltingCharge: number;
  @Prop({ type: Number })
  miscellaneousCharge: number;
}

export const PricesSchema = SchemaFactory.createForClass(PricesEntity);
