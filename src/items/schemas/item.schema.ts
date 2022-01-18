import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ItemDocument = Item & Document;

@Schema()
export class Item {
  @Prop({ required: true, index: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ default: 0 })
  inventory: number;
}

export const ItemSchema = SchemaFactory.createForClass(Item);
