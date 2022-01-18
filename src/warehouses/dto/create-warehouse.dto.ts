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
  inventory: CreateWarehouseItem[];
}
