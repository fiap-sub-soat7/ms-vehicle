import { IVehicle, SaleStatus } from '@/domain/entity/vehicle';
import { VehicleSchema } from '../schema/vehicle.schema';
import { RepositoryBase } from './repository-base';
import { IVehicleRepository } from '@/domain/repository';

export class VehicleRepository extends RepositoryBase<VehicleSchema> implements IVehicleRepository {
  async create(data: IVehicle): Promise<IVehicle> {
    const model = await this.model.create(data);

    return model.toObject();
  }

  async getAllByStatusOrderByPrice(status: SaleStatus): Promise<IVehicle[]> {
    return this.model.find({ saleStatus: status }).sort({ price: 1 }).exec();
  }

  findById(_id: string): Promise<IVehicle> {
    return this.model.findOne({ _id }).lean();
  }

  async updateOne(id: string, data: IVehicle): Promise<IVehicle> {
    await this.model.updateOne({ _id: id }, data);

    return this.findById(id);
  }
}
