import { IVehicleRepository } from '../../domain/repository/vehicle.repository';
import { IVehicle, SaleStatus } from '@/domain/entity/vehicle';
import { IUseCase } from '../usecase.interface';

export class GetVehiclesUseCase implements IUseCase<IVehicle[]> {
  constructor(private readonly vehicleRepository: IVehicleRepository) {}

  async execute(saleStatus: SaleStatus): Promise<IVehicle[]> {
    return await this.vehicleRepository.getAllByStatusOrderByPrice(saleStatus);
  }
}
