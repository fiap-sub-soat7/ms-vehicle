import { IVehicleRepository } from '../../domain/repository/vehicle.repository';
import { IVehicle, SaleStatus } from '@/domain/entity/vehicle';
import { IUseCase } from '../usecase.interface';
import { IGateway } from '@/adapter/external/gateway.interface';
import { IClientRef } from '@/domain/entity/client';

export class UpdateVehicleUseCase implements IUseCase<IVehicle> {
  constructor(
    private readonly vehicleRepository: IVehicleRepository,
    private readonly clientGateway: IGateway<string, IClientRef>,
  ) {}

  execute(vehicleId: string, vehicle: IVehicle): Promise<IVehicle> {
    // TODO: need to validate update props
    vehicle.updatedAt = new Date()

    return this.vehicleRepository.updateOne(vehicleId, vehicle);
  }

  async executeVehicleClient(vehicleId: string, clientHolder: string): Promise<IVehicle> {
    const vehicle = await this.vehicleRepository.findById(vehicleId)
    if (!vehicle) {
      throw new Error("vehicle not found");
    }

    vehicle.saleStatus = SaleStatus.SOLD
    vehicle.saledAt = new Date()
    vehicle.clientHolder = clientHolder

    return this.vehicleRepository.updateOne(vehicleId, vehicle);
  }
}
