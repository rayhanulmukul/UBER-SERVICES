import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateCoordinatesDto } from './dto/create-coordinates.dto';

@Controller('rider-coordinates')
export class RiderCoordinatesController {
    @Get()
    getRiderCoordinates() {
        return 'Hello I am rider coordinates controller';
    }
    @Post()
    saveRiderCoordinates(
        @Body() 
        createCoordinatesDto: CreateCoordinatesDto
    ) {
        return createCoordinatesDto;
    }
    
}
