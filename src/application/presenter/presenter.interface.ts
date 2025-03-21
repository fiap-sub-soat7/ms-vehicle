import { ApiProperty } from '@nestjs/swagger';
import { v4 as uuid } from 'uuid';
import { IsOptional } from 'class-validator';
import { Expose } from 'class-transformer';

export class EntityIdentityDTO {
  @ApiProperty({
    title: 'Entity identifier',
    example: uuid(),
    name: 'id',
  })
  @IsOptional()
  @Expose()
  id?: string;
}
