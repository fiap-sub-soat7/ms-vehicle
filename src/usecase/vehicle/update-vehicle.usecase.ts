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

    return this.vehicleRepository.updateOne(vehicleId, vehicle);
  }

  async executeVehicleClient(vehicleId: string, clientId: string): Promise<IVehicle> {
    const vehicle = await this.vehicleRepository.findById(vehicleId)
    if (!vehicle) {
      throw new Error("vehicle not found");
    }

    const client = await this.clientGateway.handle(clientId)
    if (!client) {
      throw new Error("client not found");
    }

    vehicle.saleStatus = SaleStatus.SOLD
    vehicle.clientId = clientId

    return this.vehicleRepository.updateOne(vehicleId, vehicle);
  }
}
