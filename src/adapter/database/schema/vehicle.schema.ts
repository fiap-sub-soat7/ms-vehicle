import { Prop, Schema } from '@nestjs/mongoose';
import { IVehicle, SaleStatus } from '@/domain/entity/vehicle';
import { AbstractEntity } from './abstract-entity';

@Schema()
export class VehicleSchema extends AbstractEntity implements IVehicle {
  @Prop({
    default: () => new Date(),
  })
  createdAt: Date;

  @Prop()
  brand: string;

  @Prop()
  model: string;

  @Prop()
  year: number;

  @Prop()
  color: string;

  @Prop()
  price: number;

  @Prop({
    default: SaleStatus.FOR_SALE,
  })
  saleStatus: SaleStatus;

  @Prop({
    default: SaleStatus.FOR_SALE,
  })
  clientId: string;
}
