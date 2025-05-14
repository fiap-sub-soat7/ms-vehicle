import { VehicleSchema } from './schema/vehicle.schema';
import { IModel } from './repository/repository-base';
import { IVehicle, SaleStatus } from '@/domain/entity/vehicle';

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
      {
        _id: '01e91a2c-ca78-4d09-bd83-e978cf0b5930',
        createdAt: new Date('2024-01-01T00:00:00.000Z'),
        brand: "Fiat",
        model: "Mobi",
        year: 2009,
        color: "#000000",
        price: 1.99,
        saleStatus: SaleStatus.FOR_SALE,
        clientHolder: "86071617090"
      },
      {
        id: '12e91a2c-ca78-4d09-bd83-e978cf0b5930',
        createdAt: new Date('2024-01-01T00:00:00.000Z'),
        brand: "Fiat",
        model: "Mobi",
        year: 2012,
        color: "#000000",
        price: 1.99,
        saleStatus: SaleStatus.FOR_SALE,
        clientHolder: "86071617090"
      },
      {
        id: '1391a2c-ca78-4d09-bd83-e978cf0b5930',
        createdAt: new Date('2024-01-01T00:00:00.000Z'),
        brand: "Fiat",
        model: "Mobi",
        year: 2012,
        color: "#000000",
        price: 1.99,
        saleStatus: SaleStatus.FOR_SALE,
        clientHolder: "86071617090"
      },
    ] as (Omit<IVehicle, 'id'> & { _id: string })[]);

    console.log('Inserting mock... done!');
  }
}
