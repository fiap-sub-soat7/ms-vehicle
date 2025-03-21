import { IController } from '../controller.interface';
import { UpdateVehicleUseCase } from '@/usecase/vehicle/update-vehicle.usecase';
import { VehicleCreateDTO } from '@/application/presenter/vehicle/dto/vehicle-create.dto';
import { VehiclePresenter } from '@/application/presenter/vehicle/vehicle.presenter';
import { VehicleDTO } from '@/application/presenter/vehicle/dto/vehicle.dto';
import { IVehicleRepository } from '@/domain/repository';

export class UpdateVehicleController implements IController<VehicleDTO> {
  useCase: UpdateVehicleUseCase;

  constructor(
    vehicleRepository: IVehicleRepository,
  ) {
    this.useCase = new UpdateVehicleUseCase(vehicleRepository);
  }

  async handle(id: string, data: VehicleCreateDTO): Promise<VehicleDTO> {
    let vehicle = await this.useCase.execute(id, data);

    return VehiclePresenter.toDTO(vehicle);
  }
}
