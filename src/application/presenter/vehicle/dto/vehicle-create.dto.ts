import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Expose } from 'class-transformer';

export class VehicleCreateDTO {
  @ApiProperty({
    example: "Fiat",
  })
  @IsNotEmpty()
  @Expose()
  brand: string;

  @ApiProperty({
    example: "Mobi",
  })
  @IsNotEmpty()
  @Expose()
  model: string;

  @ApiProperty({
    example: 2009,
  })
  @IsNotEmpty()
  @Expose()
  year: number;

  @ApiProperty({
    example: "#000000",
  })
  @IsNotEmpty()
  @Expose()
  color: string;

  @ApiProperty({
    example: 1.99,
  })
  @IsNotEmpty()
  @Expose()
  price: number;
}
