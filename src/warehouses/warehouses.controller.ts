import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Query } from 'mongoose';

import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';
import { Warehouse } from './schemas/warehouse.schema';
import { WarehousesService } from './warehouses.service';

@Controller('warehouses')
export class WarehousesController {
  /**
   * @param {WarehousesService} warehousesService - Service containing utility functions for interacting with the warehouse resource.
   */
  constructor(private readonly warehousesService: WarehousesService) {}

  /**
   * Controller for the warehouse creation route. Requires a data transfer object
   * that specifies attributes to give to the new warehouse.
   *
   * @param {CreateWarehouseDto} createWarehouseDto - Data transfer object containing information about the new warehouse.
   * @returns {Promise<Warehouse>} - Newly created database object for the warehouse.
   */
  @Post()
  create(@Body() createWarehouseDto: CreateWarehouseDto) {
    return this.warehousesService.create(createWarehouseDto);
  }

  /**
   * Controller for the warehouse findOne route. Requires an ID to be supplied in URL.
   *
   * @param {string} id - ID of the warehouse to find.
   * @returns {Promise<Warehouse>} - Warehouse information from the database.
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.warehousesService.findOne(id);
  }

  /**
   * Controller for the warehouse update route. Requires a data transfer object
   * that specifies attributes to update.
   *
   * @param {string} id - ID of the warehouse to update.
   * @param {UpdateWarehouseDto} updateWarehouseDto - Data transfer object containing attributes to update.
   * @returns {Promise<Warehouse>} - Warehouse information from the database.
   */
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateWarehouseDto: UpdateWarehouseDto,
  ) {
    return this.warehousesService.update(id, updateWarehouseDto);
  }

  /**
   * Controller for the warehouse deletion route. Requires an ID to be supplied in URL.
   *
   * @param {string} id - ID of the warehouse to delete.
   * @returns {Query} - Results of the delete operation.
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.warehousesService.remove(id);
  }
}
