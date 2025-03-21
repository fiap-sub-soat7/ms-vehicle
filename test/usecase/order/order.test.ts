// eslint-disable-next-line max-classes-per-file
import { v4 } from 'uuid';
import { CreateVehicleController } from '@/application/controller/vehicle/create-vehicle.controller';
import { ChangeStatusOrderController } from '@/application/controller/order/status-order.controller';
import { GetVehicleController } from '@/application/controller/vehicle/get-vehicles.controller';
import { QueueOrderController } from '@/application/controller/order/queue-order.controller';
import { UpdateVehicleUseCase } from '@/usecase/vehicle/update-vehicle.usecase';
import { OpenPaymentUseCase } from '@/usecase/order/open-payment.usecase';
import { getTestRepositories } from '@/test/database.helper';
import { IVehicleRepository } from '@/domain/repository/vehicle.repository';
import { IOrderCreateProduct, OrderStatus, IOrder } from '@/domain/entity/vehicle';
import { VehicleDTO } from '@/application/presenter/vehicle/dto/vehicle.dto';
import { VehicleCreateDTO } from '@/application/presenter/vehicle/dto/vehicle-create.dto';
import { IPaymentRef } from '@/domain/entity/payment';
import { IGateway } from '@/application/gateway/gateway.interface';
import { IProductRef } from '@/domain/entity/product';

export class MockProductsGateway implements IGateway<string[], IProductRef[]> {
  handle(...ids: string[]): IProductRef[] {
    return [
      {
        id: ids[0],
        name: 'Lanche de picanha suina',
        category: {
          id: '51fa38f6-ebca-426f-8dbe-3f6a385a738a',
          name: 'Lanches (não) veganos',
        },
        price: 0,
      },
    ] as IProductRef[];
  }
}

class MockPaymentTransactionGateway implements IGateway<IOrder, IPaymentRef> {
  handle(order: IOrder): IPaymentRef {
    return {
      paymentId: '1',
      orderId: order.id,
      clientId: '2',
      type: 'pix',
      total: 32,
      vendor: 'test',
      attributes: {
        qrData: 'buffer',
      },
      status: 'success',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }
}

describe('OrderModule', () => {
  let orderRepository: IVehicleRepository;

  beforeAll(() => {
    orderRepository = getTestRepositories().orderRepository;
  });

  it('create a order', async () => {
    const controller = new CreateVehicleController(orderRepository, new MockProductsGateway());

    const products: IOrderCreateProduct[] = [
      {
        id: '4dafa302-73bd-420f-aaaa-eac58bef3a23',
        quantity: 30,
      },
    ];

    const mockOrder: VehicleCreateDTO = new VehicleCreateDTO();
    mockOrder.products = products;

    const tokenFromAuthenticationHeader = `
      eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
      eyJjbGllbnRfaWQiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZG9jdW1lbnQiOiIxMjMtNDU2LTc4OSJ9.
      SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
    `.replace(/\s+/g, '');

    const result = await controller.handle(tokenFromAuthenticationHeader, mockOrder);

    expect(result.id).toHaveLength(v4().length);
  });

  it('quantity null', async () => {
    const controller = new CreateVehicleController(orderRepository, new MockProductsGateway());

    const products: IOrderCreateProduct[] = [
      {
        id: 'nacha',
        quantity: null,
      },
    ];

    const mockOrder: VehicleCreateDTO = new VehicleCreateDTO();
    mockOrder.products = products;

    const tokenFromAuthenticationHeader = `
    eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
    eyJjbGllbnRfaWQiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZG9jdW1lbnQiOiIxMjMtNDU2LTc4OSJ9.
    SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
  `.replace(/\s+/g, '');

    const result = await controller.handle(tokenFromAuthenticationHeader, mockOrder);

    expect(result.id).toHaveLength(v4().length);
  });

  it('change status order', async () => {
    const controller = new ChangeStatusOrderController(orderRepository);

    const orderId = '1ad8f3c1-09af-4fdd-a98f-7b55b4ef4c79';

    const toCooking = await controller.handle(orderId, OrderStatus.COOKING);
    expect(toCooking.status).toEqual(OrderStatus.COOKING);

    const toDone = await controller.handle(orderId, OrderStatus.DONE);
    expect(toDone.status).toEqual(OrderStatus.DONE);
  });

  it('get order by id', async () => {
    const controller = new GetVehicleController(orderRepository);

    const orderId = '1ad8f3c1-09af-4fdd-a98f-7b55b4ef4c79';

    const result = await controller.handle(orderId);
    expect(result).toBeInstanceOf(VehicleDTO);
  });

  it('error get order by id - not found', async () => {
    const controller = new GetVehicleController(orderRepository);

    try {
      await controller.handle('notfound');

    } catch (error) {
      expect(error).toBeInstanceOf(TypeError)
    }
  });

  it('get queue order', async () => {
    const controller = new QueueOrderController(orderRepository);

    const result = await controller.handle();
    expect(result).toHaveLength(4);
  });

  it('update order', async () => {
    const controller = new UpdateVehicleUseCase(orderRepository);

    const order: IOrder = {
      id: '2ad8f3c1-09af-4fdd-a98f-7b55b4ef4c79',
      client: {
        id: '1e60b435-e02a-4d93-a860-f70e36766c57',
        name: 'Helio Musque',
        document: '432432',
      },
      products: [
        {
          id: '4dafa302-73bd-420f-aaaa-eac58bef3a23',
          name: 'Lanchde de picanha suina',
          price: 21.9,
          quantity: 1,
        },
      ],
      createdAt: new Date('2024-01-01T00:00:00.000Z'),
      totalPrice: 350,
      status: OrderStatus.FINISHED,
    };

    const result = await controller.execute(order);

    expect(result.id).toEqual(order.id);
  });

  it('open payment', async () => {
    const PaymentTransactionGateway = new MockPaymentTransactionGateway();

    const controller = new OpenPaymentUseCase(orderRepository, PaymentTransactionGateway);

    const order: IOrder = {
      id: '2ad8f3c1-09af-4fdd-a98f-7b55b4ef4c79',
      client: {
        id: '1e60b435-e02a-4d93-a860-f70e36766c57',
        name: 'Helio Musque',
        document: '432432',
      },
      products: [
        {
          id: '4dafa302-73bd-420f-aaaa-eac58bef3a23',
          name: 'Lanchde de picanha suina',
          price: 21.9,
          quantity: 1,
        },
      ],
      createdAt: new Date('2024-01-01T00:00:00.000Z'),
      totalPrice: 350,
      status: OrderStatus.FINISHED,
    };

    const result = await controller.execute(order);

    expect(result.id).toEqual(order.id);
  });
});
