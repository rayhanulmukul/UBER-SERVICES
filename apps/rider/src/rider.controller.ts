import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { RiderService } from './rider.service';

@Controller()
export class RiderController {
  constructor(private readonly riderService: RiderService) { }

  @MessagePattern({ cmd: 'getRiderByID' })
  async getRiderByID(data: { id: string }) {
    return Promise.resolve({
      _id: data.id,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com'
    });
  }
}
