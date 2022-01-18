import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

import { Item } from '../../items/schemas/item.schema';

export type WarehouseDocument = Warehouse & Document;

@Schema({ _id: false })
export class WarehouseItem {
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
    index: true,
  })
  item: Item;

  @Prop({ required: true })
  amount: number;
}

@Schema()
export class Warehouse {
  // Used for inventory updates at the product level
  previousInventory: WarehouseItem[];

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  address: string;

  @Prop([WarehouseItem])
  inventory: WarehouseItem[];
}

export const WarehouseSchema = SchemaFactory.createForClass(Warehouse);
