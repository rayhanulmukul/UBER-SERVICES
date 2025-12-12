import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateCoordinatesDto } from './dto/create-coordinates.dto';
import { RiderCoordinatesService } from './rider-coordinates.service';

@Controller('rider-coordinates')
export class RiderCoordinatesController {
    constructor(private coordinatesService: RiderCoordinatesService) { }
    @Get(":id")
    async getRiderCoordinates(
        @Param('id')
        id: string
    ) {
        return this.coordinatesService.getRiderCoordinates(id);
    }
    @Post()
    saveRiderCoordinates(
        @Body()
        createCoordinatesDto: CreateCoordinatesDto
    ) {
        return this.coordinatesService.saveRiderCoordinates(createCoordinatesDto);
    }

}
