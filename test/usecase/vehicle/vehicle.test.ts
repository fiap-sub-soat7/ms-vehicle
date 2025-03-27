// eslint-disable-next-line max-classes-per-file
import { v4 } from 'uuid';
import { getTestRepositories } from '@/test/database.helper';
import { IVehicleRepository } from '@/domain/repository/vehicle.repository';
import { VehicleCreateDTO } from '@/application/presenter/vehicle/dto/vehicle-create.dto';
import { CreateVehicleController } from '@/application/controller/vehicle/create-vehicle.controller';
import { GetVehicleController } from '@/application/controller/vehicle/get-vehicles.controller';
import { UpdateVehicleController } from '@/application/controller/vehicle/update-vehicle.controller';
import { IGateway } from '@/adapter/external/gateway.interface';
import { IClientRef } from '@/domain/entity/client';
import { SaleStatus, stringToSaleStatus } from '@/domain/entity/vehicle';

class MockClientGateway implements IGateway<string, IClientRef>  {
  async handle(id: string): Promise<IClientRef> {
    return {
      id: "123123",
      name: "Alberto",
      document: "58437220132"
    };
  }
}

class MockClientGatewayNotFound implements IGateway<string, IClientRef>  {
  async handle(id: string): Promise<IClientRef> {
    return null
  }
}

// export class MockAmazonSQSGateway {
//   sendMessage(action: IAction): Promise<string> {
//     return Promise.resolve('message posted');
//   }
// }

describe('Vehicle usecases and controllers', () => {
  let vehicleRepository: IVehicleRepository;

  beforeAll(() => {
    vehicleRepository = getTestRepositories().vehicleRepository;
  });

  it('create a vehicle', async () => {
    const controller = new CreateVehicleController(vehicleRepository);

    const mockVehicleRequest: VehicleCreateDTO = {
      brand: "Fiat",
      model: "Mobi",
      year: 2009,
      color: "#000000",
      price: 1.99
    };

    const result = await controller.handle(mockVehicleRequest);

    expect(result.id).toHaveLength(v4().length);
  });

  it('list vehicles by sale status', async () => {
    const controller = new GetVehicleController(vehicleRepository);

    const result = await controller.handle("for_sale");

    expect(result).toHaveLength(4);
  });

  it('update vehicle', async () => {
      const controller = new UpdateVehicleController(vehicleRepository, new MockClientGateway());

      const mockVehicleRequest: VehicleCreateDTO = {
        brand: "Fiat",
        model: "Mobi",
        year: 2010,
        color: "#000000",
        price: 1.99
      };

      const result = await controller.handle("01e91a2c-ca78-4d09-bd83-e978cf0b5930", mockVehicleRequest);

      expect(result != null)
  });

  it('update vehicle client', async () => {
    const controller = new UpdateVehicleController(vehicleRepository, new MockClientGateway());

    const result = await controller.handleVehicleClient("01e91a2c-ca78-4d09-bd83-e978cf0b5930", "123213213");

    expect(result != null)
  });

  it('error update vehicle client - vehicle not found', async () => {
    try {
      const controller = new UpdateVehicleController(vehicleRepository, new MockClientGateway());

      await controller.handleVehicleClient("", "123213213");
    } catch (error) {
      expect(error).toThrowError;
    }
  });

  it('error update vehicle client - client not found', async () => {
    try {
      const controller = new UpdateVehicleController(vehicleRepository, new MockClientGatewayNotFound());

      await controller.handleVehicleClient("01e91a2c-ca78-4d09-bd83-e978cf0b5930", "123213213");
    } catch (error) {
      expect(error).toThrowError;
    }
  });

  it('should convert to sale status', async () => {
      const res = stringToSaleStatus("for_sale")


      expect(res).toEqual(SaleStatus.FOR_SALE)
  });

  it('error convert to sale status', async () => {
    try {
      stringToSaleStatus("")
    } catch (error) {
      expect(error).toThrowError;
    }
});
});
