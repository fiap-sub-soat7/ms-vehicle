import { Module } from '@nestjs/common';
import { VehicleController } from './routes/vehicle.controller';

@Module({
  providers: [],
  controllers: [VehicleController],
})
export class AppModule {}
