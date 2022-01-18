import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Item, ItemSchema } from '../items/schemas/item.schema';

import { Warehouse, WarehouseSchema } from './schemas/warehouse.schema';
import { WarehousesController } from './warehouses.controller';
import { WarehousesService } from './warehouses.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Item.name, schema: ItemSchema }]),
    MongooseModule.forFeature([
      { name: Warehouse.name, schema: WarehouseSchema },
    ]),
  ],
  controllers: [WarehousesController],
  providers: [WarehousesService],
})
export class WarehousesModule {}
