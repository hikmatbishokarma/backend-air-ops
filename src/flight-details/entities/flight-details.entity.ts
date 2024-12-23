import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseEntity } from 'src/common/entities/base.entity';

@Schema()
export class Specification {
  @Prop()
  icon: string;

  @Prop()
  name: string;
}

@Schema({ collection: 'flight-details', timestamps: true })
export class FlightDetailsEntity extends BaseEntity {
  @Prop()
  code: string;
  @Prop()
  name: string;
  @Prop()
  description: string;
  @Prop()
  image: string;
  @Prop()
  specifications: Specification;
}

export const FlightDetailsSchema =
  SchemaFactory.createForClass(FlightDetailsEntity);
FlightDetailsSchema.index({ code: 1 }, { unique: true });
