import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  Warehouse,
  WarehouseSchema,
} from '../warehouses/schemas/warehouse.schema';

import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';
import { Item, ItemSchema } from './schemas/item.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Item.name, schema: ItemSchema }]),
    MongooseModule.forFeature([
      { name: Warehouse.name, schema: WarehouseSchema },
    ]),
  ],
  controllers: [ItemsController],
  providers: [ItemsService],
  exports: [ItemsService],
})
export class ItemsModule {}
