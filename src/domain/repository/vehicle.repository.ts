import { IVehicle, SaleStatus } from '@/domain/entity/vehicle';

export interface IVehicleRepository {
  create(data: IVehicle): Promise<IVehicle>;
  findById(id: string): Promise<IVehicle>;
  updateOne(id: string, data: IVehicle): Promise<IVehicle>;
  getAllByStatusOrderByPrice(status: SaleStatus): Promise<IVehicle[]>
}
