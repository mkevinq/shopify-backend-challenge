import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import mongoose from 'mongoose';

import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ItemsService } from './items.service';
import { Item } from './schemas/item.schema';

@Controller('items')
export class ItemsController {
  /**
   * @param {ItemsService} itemsService - Service containing utility functions for interacting with the items resource.
   */
  constructor(private readonly itemsService: ItemsService) {}

  /**
   * Controller for the items creation route. Requries a data transfer object
   * that specified attributes to give to the new item.
   *
   * @param {CreateItemDto} createItemDto - Data transfer object containing informationa bout the new item.
   * @returns {Promise<Item>} - Newly created database object for the item.
   */
  @Post()
  create(@Body() createItemDto: CreateItemDto) {
    return this.itemsService.create(createItemDto);
  }

  /**
   * Controller for finding all items in the database. Requires a page number.
   *
   * @param {number} page - Page of results to return.
   * @returns {Promise<Item[]>} - List of items from the current page.
   */
  @Get()
  findAll(@Query('page') page: number) {
    return this.itemsService.findAll(page);
  }

  /**
   * Controller for the item findOne route. Requires an ID to be supplied in the URL.
   *
   * @param {string} id - ID of the item to find.
   * @returns {Promise<Item>} - Item information from the database.
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemsService.findOne(id);
  }

  /**
   * Controller for the item update route. Requires a data transfer object
   * that specifies attributes to update.
   *
   * @param {string} id - ID of the item to update.
   * @param {UpdateItemDto} updateItemDto - Data transfer object containing attributes to update.
   * @returns {Promise<Item>} - Updated item information from the database.
   */
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    return this.itemsService.update(id, updateItemDto);
  }

  /**
   * Controller for the item deletion route. Requires an ID to be supplied in the URL.
   *
   * @param {string} id - ID of the item to delete.
   * @returns {mongoose.Query} - Results of the delete operation.
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemsService.remove(id);
  }

  /**
   * Controller for the item inventory route. Requires an ID to be supplied in URL.
   *
   * @param {string} id - ID of the item to get the inventory for.
   * @returns {Promise<number>} - Total inventory for the item.
   */
  @Get('inventory/:id')
  getInventory(@Param('id') id: string) {
    return this.itemsService.getInventory(id);
  }
}
