import { VehicleSchema } from './schema/vehicle.schema';
import { IModel } from './repository/repository-base';
import { IVehicle } from '@/domain/entity/vehicle';

export class Mock {
  constructor(private readonly vehicleModel: IModel<VehicleSchema>) {}

  async execute(): Promise<void> {
    const checkMock = await this.vehicleModel.findById('1ad8f3c1-09af-4fdd-a98f-7b55b4ef4c79');

    if (checkMock) return;

    console.log('Inserting mock...');
    // Mock for development -> TODO: create migration
    // Vehicle
    await this.vehicleModel.deleteMany({
      $or: [
        { _id: '01e91a2c-ca78-4d09-bd83-e978cf0b5930' },
        { _id: '12e91a2c-ca78-4d09-bd83-e978cf0b5930' },
        { _id: '1391a2c-ca78-4d09-bd83-e978cf0b5930' },
        { _id: '4ad8f3c1-09af-4fdd-a98f-7b55b4ef4c79' },
        { _id: '5ad8f3c1-09af-4fdd-a98f-7b55b4ef4c79' },
      ],
    });
    await this.vehicleModel.insertMany([
    ] as (Omit<IVehicle, 'id'> & { _id: string })[]);

    console.log('Inserting mock... done!');
  }
}
