import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Query } from 'mongoose';

import { Item, ItemDocument } from '../items/schemas/item.schema';

import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';
import { Warehouse, WarehouseDocument } from './schemas/warehouse.schema';

@Injectable()
export class WarehousesService {
  /**
   * @param {Model<WarehouseDocument>} warehouseModel - Warehouse model to interface with the warehouse collection.
   * @param {Model<ItemDocument>} itemModel - Item model to interface with the items collection.
   */
  constructor(
    @InjectModel(Warehouse.name)
    private warehouseModel: Model<WarehouseDocument>,
    @InjectModel(Item.name) private itemModel: Model<ItemDocument>,
  ) {}

  /**
   * Creates a warehouse in the warehouse collection.
   * A warehouse must have a name, location, and a list of items that it holds.
   *
   * @param {CreateWarehouseDto} createWarehouseDto - Data transfer object containing warehouse information.
   * @returns {Promise<Warehouse>} - Created database document.
   */
  async create(createWarehouseDto: CreateWarehouseDto) {
    // Verify that all specified items exist before continuing to create the warehouse
    const results = await Promise.all(
      createWarehouseDto.inventory.map(async ({ item }) => {
        try {
          const document = await this.itemModel.findOne({ _id: item });
          return {
            item,
            doc: document,
          };
        } catch {
          return {
            item,
            doc: undefined,
          };
        }
      }),
    );

    if (results.every(({ doc }) => Boolean(doc))) {
      return this.warehouseModel.create(createWarehouseDto);
    }

    throw new HttpException(
      {
        statusCode: HttpStatus.BAD_REQUEST,
        message: "Some items don't exist",
        missingIds: results
          .filter(({ doc }) => !Boolean(doc))
          .map(({ item }) => item),
      },
      HttpStatus.BAD_REQUEST,
    );
  }

  /**
   * Return information about a specifc warehouse with the given ID.
   *
   * @param {string} id - ID of the warehouse to find.
   * @returns {Promise<Warehouse>} - Warehouse information from the database.
   */
  async findOne(id: string) {
    try {
      const result = await this.warehouseModel.findOne({ _id: id }).lean();

      if (result) {
        return result;
      }
    } catch {
      // If there's an error, it probably means it doesn't exist. Move on below.
    }

    throw new HttpException(
      `Could not find a warehouse with id ${id}. Does it exist?`,
      HttpStatus.NOT_FOUND,
    );
  }

  /**
   * Update attributes for a specific warehouse.
   *
   * @param {string} id - ID of the warehouse to update.
   * @param {UpdateWarehouseDto} updateWarehouseDto - Data transfer object containing attributes to update.
   * @returns {Promise<Warehouse>} - Updated version of the document from the database.
   */
  async update(id: string, updateWarehouseDto: UpdateWarehouseDto) {
    const result = await this.warehouseModel
      .findOneAndUpdate({ _id: id }, updateWarehouseDto, { new: true })
      .lean();

    if (result) {
      return result;
    }

    throw new HttpException(
      `Could not find a warehouse with id ${id}. Does it exist?`,
      HttpStatus.NOT_FOUND,
    );
  }

  /**
   * Delete a given warehouse.
   *
   * @param {string} id - ID of the warehouse to delete.
   * @returns {Query} - Results of the deletion operation.
   */
  remove(id: string) {
    return this.warehouseModel.deleteOne({ _id: id }).lean();
  }
}
