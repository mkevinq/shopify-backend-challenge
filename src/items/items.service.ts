import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Query } from 'mongoose';

import {
  Warehouse,
  WarehouseDocument,
} from '../warehouses/schemas/warehouse.schema';

import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item, ItemDocument } from './schemas/item.schema';

@Injectable()
export class ItemsService {
  /**
   * @param {Model<ItemDocument>} itemModel - Item model to interface with the items collection.
   * @param {Model<WarehouseDocument>} warehouseModel - Warehouse model to interface with the warehouse collection.
   */
  constructor(
    @InjectModel(Item.name) private itemModel: Model<ItemDocument>,
    @InjectModel(Warehouse.name)
    private warehouseModel: Model<WarehouseDocument>,
  ) {}

  /**
   * Creates an item in the items collection.
   * An item must have a name and description.
   *
   * @param {CreateItemDto} createItemDto - Data transfer object containing item information.
   * @returns {Promise<Item>} - Created item database document.
   */
  create(createItemDto: CreateItemDto) {
    return this.itemModel.create(createItemDto);
  }

  /**
   * Return information about all items. This is a paginated function.
   *
   * @param {number} page - Page number to look in.
   * @returns {Promise<Item[]>} - List of items in the current page.
   */
  findAll(page: number) {
    const pageToFetch = (Number.isNaN(page) || page <= 0 ? 1 : page) - 1;

    // Skip + limit isn't the most optimal way to paginate, but this should suffice for a small demo
    return this.itemModel
      .find()
      .skip(pageToFetch * 50)
      .limit(50);
  }

  /**
   * Return information about a specific item with the given ID.
   *
   * @param {string} id - ID of the item to find.
   * @returns {Promise<Item>} - Item information from the database.
   */
  async findOne(id: string) {
    try {
      const result = await this.itemModel.findOne({ _id: id }).lean();

      if (result) {
        return result;
      }
    } catch {
      // If there's an error, it probably means it doesn't exist. Move on below.
    }

    throw new HttpException(
      `Could not find item with id ${id}. Does it exist?`,
      HttpStatus.NOT_FOUND,
    );
  }

  /**
   * Return the total amount of stock across all warehouses for a given product.
   *
   * @param {string} id - ID of the item to find the inventory for.
   * @returns {Promise<number>} - The amount of stock for this item.
   */
  async getInventory(id: string) {
    const [results] = await this.warehouseModel.aggregate([
      { $match: { 'inventory.item': new mongoose.Types.ObjectId(id) } },
      {
        $project: {
          inventory: {
            $filter: {
              input: '$inventory',
              cond: { $eq: ['$$this.item', new mongoose.Types.ObjectId(id)] },
            },
          },
        },
      },
      { $unwind: '$inventory' },
      {
        $group: {
          // eslint-disable-next-line unicorn/no-null
          _id: null,
          inventory: { $sum: '$inventory.amount' },
        },
      },
    ]);

    return results?.inventory ?? 0;
  }

  /**
   * Update attributes for a specific item.
   *
   * @param {string} id - ID of the item to update.
   * @param {UpdateItemDto} updateItemDto - Data transfer object containing attributes to update.
   * @returns {Promise<Item>} - Updated version of the document from the database.
   */
  async update(id: string, updateItemDto: UpdateItemDto) {
    const result = await this.itemModel
      .findOneAndUpdate({ _id: id }, updateItemDto, { new: true })
      .lean();

    if (result) {
      return result;
    }

    throw new HttpException(
      `Could not find an item with id ${id}. Does it exist?`,
      HttpStatus.NOT_FOUND,
    );
  }

  /**
   * Delete a given item.
   *
   * @param {string} id - ID of the item to dfelete.
   * @returns {Query} - Results of the deletion operation.
   */
  remove(id: string) {
    return this.itemModel.deleteOne({ _id: id }).lean();
  }
}
