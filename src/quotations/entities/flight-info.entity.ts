import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseEntity } from 'src/common/entities/base.entity';
import { toJsonTransformPlugin } from 'src/mongoose-query/plugins';

@Schema({ _id: false })
export class Specification {
  @Prop()
  icon: string;

  @Prop()
  name: string;
}

@Schema({ collection: 'flight-info', timestamps: true })
export class FlightInfoEntity extends BaseEntity {
  @Prop()
  code: string;
  @Prop()
  name: string;
  @Prop()
  description: string;
  @Prop()
  image: string;
  @Prop({ type: [Specification], _id: false })
  specifications: Specification[];
  @Prop()
  termsAndConditions: string;
}

export const FlightInfoSchema = SchemaFactory.createForClass(FlightInfoEntity);

FlightInfoSchema.index({ code: 1 }, { unique: true });
// Apply the plugin
FlightInfoSchema.plugin(toJsonTransformPlugin);
