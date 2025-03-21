import { IController } from '../controller.interface';
import { CreateVehicleUseCase } from '@/usecase/vehicle/create-vehicle.usecase';
import { VehicleCreateDTO } from '@/application/presenter/vehicle/dto/vehicle-create.dto';
import { VehiclePresenter } from '@/application/presenter/vehicle/vehicle.presenter';
import { VehicleDTO } from '@/application/presenter/vehicle/dto/vehicle.dto';
import { IVehicleRepository } from '@/domain/repository';

export class CreateVehicleController implements IController<VehicleDTO> {
  useCase: CreateVehicleUseCase;

  constructor(
    vehicleRepository: IVehicleRepository,
  ) {
    this.useCase = new CreateVehicleUseCase(vehicleRepository);
  }

  async handle(data: VehicleCreateDTO): Promise<VehicleDTO> {
    let vehicle = await this.useCase.execute(data);

    return VehiclePresenter.toDTO(vehicle);
  }
}
