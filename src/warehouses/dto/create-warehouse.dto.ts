import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';

import ObjectArrayUniqueProperty from '../../validators/object-array-unique.validator';

export class CreateWarehouseItem {
  @IsNotEmpty()
  @IsString()
  item: string;

  @IsNumber()
  @Min(0)
  amount: number;
}

export class CreateWarehouseDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @ValidateNested({ each: true })
  @Type(() => CreateWarehouseItem)
  @IsArray()
  @ArrayNotEmpty()
  @ObjectArrayUniqueProperty('item')
  inventory: CreateWarehouseItem[];
}
