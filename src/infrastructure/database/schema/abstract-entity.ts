import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Prop } from '@nestjs/mongoose';
import { v4 as uuid } from 'uuid';
import { IsOptional } from 'class-validator';

export class AbstractEntity {
  @Prop({
    default: () => uuid(),
  })
  _id: string;

  @ApiProperty({
    title: 'Entity identifier',
    example: uuid(),
    name: 'id',
  })
  @Expose({ name: '_id', toClassOnly: true })
  @IsOptional()
  /**
   * @deprecated Use `_id` property - used only to response mapper
   */
  id?: string;
}
