import { instanceToDTO } from '../presenter.helper';
import { VehicleDTO } from './dto/vehicle.dto';
import { IVehicle } from '@/domain/entity/vehicle';

export class VehiclePresenter {
  static toDTO(data: IVehicle): VehicleDTO;
  static toDTO(data: IVehicle[]): VehicleDTO[];
  static toDTO<T extends IVehicle | IVehicle[]>(data: T): VehicleDTO | VehicleDTO[] {
    if (Array.isArray(data)) {
      return instanceToDTO(data, VehicleDTO);
    }

    const vehicle = instanceToDTO(data, VehicleDTO) as VehicleDTO;

    return vehicle;
  }
}
