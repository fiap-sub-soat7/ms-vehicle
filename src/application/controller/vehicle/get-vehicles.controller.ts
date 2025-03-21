import { IController } from '../controller.interface';
import { VehiclePresenter } from '@/application/presenter/vehicle/vehicle.presenter';
import { IVehicleRepository } from '@/domain/repository';
import { GetVehiclesUseCase } from '@/usecase/vehicle/get-vehicles.usecase';
import { VehicleDTO } from '@/application/presenter/vehicle/dto/vehicle.dto';
import { stringToSaleStatus } from '@/domain/entity/vehicle';

export class GetVehicleController implements IController<VehicleDTO[]> {
  useCase: GetVehiclesUseCase;

  constructor(vehicleRepository: IVehicleRepository) {
    this.useCase = new GetVehiclesUseCase(vehicleRepository);
  }

  async handle(status: string): Promise<VehicleDTO[]> {
    const saleStatus = stringToSaleStatus(status)

    const vehicles = await this.useCase.execute(saleStatus);

    return VehiclePresenter.toDTO(vehicles);
  }
}
