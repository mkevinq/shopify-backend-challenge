import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemsModule } from './items/items.module';
import { WarehousesModule } from './warehouses/warehouses.module';

@Module({
  imports: [
    ItemsModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URL),
    WarehousesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
