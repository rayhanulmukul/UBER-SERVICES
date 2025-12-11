import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {HydrateDocument} from 'mongoose';

export type RiderCoordinatesDocument = HydrateDocument<RiderCoordinates>;

@Schema()
class RiderCoordinateSchema{
    @Prop({reguired: true})
    lat: number;

    @Prop({required: true})
    lng: number;

    @Prop({required: true})
    rider: string;
}

export const RiderCoordinateSchemaFactory = SchemaFactory.createForClass(RiderCoordinateSchema); 