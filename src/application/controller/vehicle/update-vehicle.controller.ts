import { IController } from '../controller.interface';
import { UpdateVehicleUseCase } from '@/usecase/vehicle/update-vehicle.usecase';
import { VehicleCreateDTO } from '@/application/presenter/vehicle/dto/vehicle-create.dto';
import { VehiclePresenter } from '@/application/presenter/vehicle/vehicle.presenter';
import { VehicleDTO } from '@/application/presenter/vehicle/dto/vehicle.dto';
import { IVehicleRepository } from '@/domain/repository';
import { GetClientGateway } from '@/adapter/external/client/get-client.gateway';

export class UpdateVehicleController implements IController<VehicleDTO> {
  useCase: UpdateVehicleUseCase;
  clientGateway: GetClientGateway;

  constructor(
    vehicleRepository: IVehicleRepository,
    clientGateway: GetClientGateway
  ) {
    this.useCase = new UpdateVehicleUseCase(vehicleRepository, clientGateway);
  }

  async handle(id: string, data: VehicleCreateDTO): Promise<VehicleDTO> {
    let vehicle = await this.useCase.execute(id, data);

    return VehiclePresenter.toDTO(vehicle);
  }

  async handleVehicleClient(vehicleId: string, clientHolder: string): Promise<VehicleDTO> {
    let vehicle = await this.useCase.executeVehicleClient(vehicleId, clientHolder);

    return VehiclePresenter.toDTO(vehicle);
  }
}
