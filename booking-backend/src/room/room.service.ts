import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { Room } from 'src/entities/room.entity';
import { ISortOptions } from 'src/models/shared.model';
import { Repository } from 'typeorm';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
  ) {}

  async getAllRooms(
    paginationOptions: IPaginationOptions,
    sortOptions: ISortOptions,
  ) {
    try {
      const rooms = await paginate(this.roomRepository, paginationOptions, {
        order: { [sortOptions.field]: sortOptions.order },
      });
      return rooms;
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException();
    }
  }

  async getRoom(id: string) {
    try {
      const room = await this.roomRepository.findOne(id);
      if (!room) {
        throw new NotFoundException({
          error: 'Not Found',
          statusCode: 404,
          message: "Room doesn't exist",
        });
      }
      return room;
    } catch (err) {
      if ([404].includes(err.status)) throw err;
      console.error(err);
      throw new InternalServerErrorException();
    }
  }

  async createRoom(label: string) {
    try {
      const room = new Room(label);
      return await this.roomRepository.save(room);
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException();
    }
  }

  async editRoom(id: string, label: string) {
    try {
      const room = await this.roomRepository.findOne(id);
      if (!room) {
        throw new NotFoundException({
          error: 'Not Found',
          statusCode: 404,
          message: "Room doesn't exist",
        });
      }
      room.label = label;
      return await this.roomRepository.save(room);
    } catch (err) {
      if ([404].includes(err.status)) throw err;
      console.error(err);
      throw new InternalServerErrorException();
    }
  }

  async deleteRoom(id: string) {
    try {
      const room = await this.roomRepository.findOne(id);
      if (!room) {
        throw new NotFoundException({
          error: 'Not Found',
          statusCode: 404,
          message: "Room doesn't exist",
        });
      }
      await this.roomRepository.remove(room);
      return { success: true };
    } catch (err) {
      if ([404].includes(err.status)) throw err;
      console.error(err);
      throw new InternalServerErrorException();
    }
  }
}
