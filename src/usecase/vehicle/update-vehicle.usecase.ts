import { IVehicleRepository } from '../../domain/repository/vehicle.repository';
import { IVehicle } from '@/domain/entity/vehicle';
import { IUseCase } from '../usecase.interface';

export class UpdateVehicleUseCase implements IUseCase<IVehicle> {
  constructor(private readonly vehicleRepository: IVehicleRepository) {}

  execute(vehicleId: string, vehicle: IVehicle): Promise<IVehicle> {
    // TODO: need to validate update props

    return this.vehicleRepository.updateOne(vehicleId, vehicle);
  }
}
