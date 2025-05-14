import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IVehicle, SaleStatus  } from '@/domain/entity/vehicle';
import { AbstractEntity } from '@/adapter/database/schema/abstract-entity';

export class VehicleDTO extends AbstractEntity implements IVehicle {
  @ApiProperty({
    example: "Fiat",
  })
  @Expose()
  brand: string;

  @ApiProperty({
    example: "Mobi",
  })
  @Expose()
  model: string;

  @ApiProperty({
    example: 2009,
  })
  @Expose()
  year: number;

  @ApiProperty({
    example: "#000000",
  })
  @Expose()
  color: string;

  @ApiProperty({
    example: 1.99,
  })
  @Expose()
  price: number;

  @ApiProperty({
    example: SaleStatus.SOLD,
  })
  @Expose()
  saleStatus: SaleStatus;

  @ApiProperty({
    example: "86071617090",
  })
  @Expose()
  clientHolder: string;

  @ApiProperty({
    example: "2025-05-12T22:49:36.809Z",
  })
  @Expose()
  createdAt: Date;

  @ApiProperty({
    example: "2025-05-12T22:49:36.809Z",
  })
  @Expose()
  updatedAt: Date;

  @ApiProperty({
    example: "2025-05-12T22:49:36.809Z",
  })
  @Expose()
  saledAt: Date;
}
