import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RiderCoordinate, RiderCoordinatesDocument } from './rider-coordinates.schema';
import { CreateCoordinatesDto } from './dto/create-coordinates.dto';
import { Model } from 'mongoose';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class RiderCoordinatesService {
    constructor(
        @InjectModel(RiderCoordinate.name)
        private readonly riderCoordinatesModel: Model<RiderCoordinatesDocument>,
        @Inject('RIDER_SERVICE') private client: ClientProxy
    ) { }
    async getRiderCoordinates(riderId: string) {
        const coordinates = await this.riderCoordinatesModel.find({ rider: riderId });
        const pattern = { cmd: 'getRiderByID' };
        const payload = { id: riderId };
        const rider = await firstValueFrom(this.client.send(pattern, payload));
        return {
            rider,
            coordinates
        }
    }

    async saveRiderCoordinates(createCoordinatesDto: CreateCoordinatesDto) {
        const createdRiderCoordinate = new this.riderCoordinatesModel(createCoordinatesDto);
        return await createdRiderCoordinate.save();
    }
}
