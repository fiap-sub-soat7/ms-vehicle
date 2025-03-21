import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { VehicleDTO } from '../../../application/presenter/vehicle/dto/vehicle.dto';
import { VehicleCreateDTO } from '../../../application/presenter/vehicle/dto/vehicle-create.dto';
import { CreateVehicleController } from '@/application/controller/vehicle/create-vehicle.controller';
import { UpdateVehicleController } from '@/application/controller/vehicle/update-vehicle.controller';
import { GetVehicleController } from '@/application/controller/vehicle/get-vehicles.controller';
import { vehicleRepository } from '@/adapter/database/database.adapter';

@ApiTags('Vehicle')
@Controller()
export class VehicleController {
  private vehicleController = new CreateVehicleController(vehicleRepository);

  private updateVehicleController = new UpdateVehicleController(vehicleRepository);

  private getVehicleController = new GetVehicleController(vehicleRepository);

  @Post('')
  @ApiOperation({ summary: 'Create Vehicle' })
  @ApiResponse({
    status: 201,
    description: 'The vehicle has been successfully created.',
    type: VehicleDTO,
  })
  create(@Body() data: VehicleCreateDTO): Promise<VehicleDTO> {
    return this.vehicleController.handle(data);
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Update Vehicle' })
  @ApiResponse({
    status: 200,
    description: 'The vehicle has been successfully updated.',
    type: VehicleDTO,
  })
  update(@Param('id') id: string, @Body() data: VehicleCreateDTO): Promise<VehicleDTO> {
    return this.updateVehicleController.handle(id, data);
  }

   @Get(':status')
   @ApiOperation({ summary: 'List vehicles by status ordered by price' })
   @ApiResponse({
     status: 200,
     description: 'Return vehicles',
     type: [VehicleDTO],
   })
   getVehicleByStatus(@Param('status') status: string): Promise<VehicleDTO[]> {
     return this.getVehicleController.handle(status);
   }

   @Patch(':vehicleId/client/:clientId')
   @ApiOperation({ summary: 'Update vehicle client' })
   @ApiResponse({
     status: 200,
     description: 'Links a customer to a vehicle.',
     type: VehicleDTO,
   })
   updateVehicleClient(@Param('vehicleId') vehicleId: string, @Param('clientId') clientId: string): Promise<VehicleDTO> {
     return this.updateVehicleController.handleVehicleClient(vehicleId, clientId);
   }
}
