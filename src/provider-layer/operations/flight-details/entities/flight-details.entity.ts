import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseEntity } from 'src/common/entities/base.entity';
import { toJsonTransformPlugin } from 'src/mongoose-query/plugins';

@Schema({ _id: false })
export class PFMCSchema {
  @Prop()
  type: String;
  @Prop()
  captain: String;
  @Prop()
  coPilot: String;
  @Prop()
  reservePilot1: String;
  @Prop()
  reservePilot2: String;
  @Prop()
  engineer: String;
  @Prop()
  cabinCrew: String;
  @Prop()
  operations: String;
  @Prop()
  doctorName: String;
  @Prop()
  alternateDoctor: String;
  @Prop()
  report: String;
  @Prop()
  video: String;
}

@Schema({ _id: false })
export class SectorSchema {
  @Prop()
  depatureDate: string;
  @Prop()
  departure: string;
  @Prop()
  arrival: string;
  @Prop()
  etd: string;
  @Prop()
  eta: string;
  @Prop()
  noOfPax: number;
  @Prop()
  manifest: string;
}

@Schema({ _id: false })
export class fuelSchema {
  @Prop()
  fuelOnArrival: string;
  @Prop()
  fuelUpload: string;
  @Prop()
  fuelVoucher?: string;
  @Prop()
  fuelOnGage: string;
}

@Schema({ _id: false })
export class tripkitSchema {
  @Prop()
  flightPlan: String;
  @Prop()
  weatherBriefing: String;
  @Prop()
  notams: String;
  @Prop()
  otherUploads: [String];
  @Prop()
  loadTrimCG: String;
}

@Schema({ collection: 'flight-details', timestamps: true })
export class FlightDetailsEntity extends BaseEntity {
  @Prop({ unique: true, required: true })
  flightId: string;
  @Prop()
  tailNo: String;
  @Prop()
  depatureDate: string;
  @Prop({ type: [PFMCSchema] })
  pfmc: [PFMCSchema];
  @Prop({ type: [SectorSchema] })
  sectors: [SectorSchema];
  @Prop({ type: fuelSchema })
  fuel: fuelSchema;
  @Prop({ type: tripkitSchema })
  tripkit: tripkitSchema;
}

export const FlightDetailsSchema =
  SchemaFactory.createForClass(FlightDetailsEntity);
FlightDetailsSchema.index({ tailNo: 1 }); // Adds an index for tailNo
// Apply the plugin
FlightDetailsSchema.plugin(toJsonTransformPlugin);
