import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { RiderModule } from './rider.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(RiderModule, {
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: 3001
    }
  });
  await app.listen();
}
bootstrap();
