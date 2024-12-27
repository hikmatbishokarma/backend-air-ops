import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { BaseEntity } from 'src/common/entities/base.entity';
import { toJsonTransformPlugin } from 'src/mongoose-query/plugins';

@Schema({ collection: 'prices', timestamps: true })
export class PricesEntity extends BaseEntity {
  @Prop({ type: Number })
  basePrice: number;
  @Prop({ type: Number })
  duration: number;
  @Prop({ type: Number })
  groundHandlingCharge: number;
  @Prop({ type: Number })
  crewBeltingCharge: number;
  @Prop({ type: Number })
  miscellaneousCharge: number;
  @Prop({ type: [String] })
  taxes: string[];
  // @Prop({ type: Boolean })
  // isSGST: boolean;
  // @Prop({ type: Boolean })
  // isCGST: boolean;
  // @Prop({ type: Boolean })
  // isIGST: boolean;
}

export const PricesSchema = SchemaFactory.createForClass(PricesEntity);
PricesSchema.plugin(toJsonTransformPlugin);
