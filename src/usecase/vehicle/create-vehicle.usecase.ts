import { IVehicleRepository } from '../../domain/repository/vehicle.repository';
import {  IVehicle } from '@/domain/entity/vehicle';
import { IUseCase } from '../usecase.interface';
import { VehicleCreateDTO } from '@/application/presenter/vehicle/dto/vehicle-create.dto';

export class CreateVehicleUseCase implements IUseCase<IVehicle> {
  constructor(
    private readonly vehicleRepository: IVehicleRepository,
  ) {}

  async execute(vehicleDTO: IVehicle): Promise<IVehicle> {

    const vehicle = await this.vehicleRepository.create(vehicleDTO);

    return vehicle;
  }
}
