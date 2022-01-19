import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from 'src/entities/booking.entity';
import { Room } from 'src/entities/room.entity';
import { User } from 'src/entities/user.entity';
import { Repository, Between, MoreThan, LessThan } from 'typeorm';
import { isBefore } from 'date-fns';
import { ethers, Wallet } from 'ethers';
import * as config from '../deploy-config.json';

export interface BookingRoom {
  uuid: string;
  date: string;
  start_time: string;
  end_time: string;
  userId: string;
  roomId: string;
  transaction_id: string;
}
@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
  ) {}

  async getAllRoomBookings(room_id: string) {
    try {
      const room = await this.roomRepository.findOne(room_id);
      if (!room) {
        throw new UnprocessableEntityException({
          error: 'Unprocessable Entity',
          statusCode: 422,
          message: 'Room does not exist',
        });
      }
      const bookings = this.bookingRepository.find({
        where: { room: { id: room.id } },
        relations: ['user', 'room'],
        order: { start_time: 'ASC' },
      });
      return bookings;
    } catch (err) {
      if ([422].includes(err.status)) throw err;
      console.error(err);
      throw new InternalServerErrorException();
    }
  }

  async getBooking(booking_id: string) {
    try {
      const booking = await this.bookingRepository.findOne(booking_id, {
        relations: ['user', 'room'],
      });
      if (!booking) {
        throw new NotFoundException({
          error: 'Not Found',
          statusCode: 404,
          message: 'Booking does not exist',
        });
      }
      return booking;
    } catch (err) {
      if ([404].includes(err.status)) throw err;
      console.error(err);
      throw new InternalServerErrorException();
    }
  }

  async bookingIsValid(
    room_id: string,
    date: Date,
    start_time: Date,
    end_time: Date,
  ) {
    try {
      const room = await this.roomRepository.findOne(room_id);
      if (!room) {
        throw new UnprocessableEntityException({
          error: 'Unprocessable Entity',
          statusCode: 422,
          message: 'Room does not exist',
        });
      }

      if (isBefore(start_time, new Date())) {
        throw new BadRequestException({
          error: 'Bad Request',
          statusCode: 400,
          message: 'Invalid date',
        });
      }

      if (isBefore(end_time, start_time)) {
        throw new BadRequestException({
          error: 'Bad Request',
          statusCode: 400,
          message: 'Invalid time',
        });
      }

      if (await this.bookingExists(start_time, end_time, room.id)) {
        throw new ConflictException({
          error: 'Conflict',
          statusCode: 409,
          message: 'Room already booked during that time',
        });
      }
      return true;
    } catch (err) {
      if ([409, 422, 401, 400].includes(err.status)) throw err;
      console.error(err);
      throw new InternalServerErrorException();
    }
  }
  async bookRoom(
    user: User,
    room_id: string,
    date: Date,
    start_time: Date,
    end_time: Date,
    transaction_id: string,
    uuid: string,
  ) {
    try {
      const room = await this.roomRepository.findOne(room_id);

      this.bookingIsValid(room_id, date, start_time, end_time);

      const booking = new Booking(
        user,
        room,
        date,
        start_time,
        end_time,
        transaction_id,
        uuid,
      );

      const contract = await this.getContract();

      const response = await contract.getBooking(uuid);

      if (response && response.uuid === uuid) {
        return await this.bookingRepository.save(booking);
      }
    } catch (err) {
      if ([409, 422, 401, 400].includes(err.status)) throw err;
      console.error(err);
      throw new InternalServerErrorException();
    }
  }

  async getContract() {
    const provider = new ethers.providers.InfuraProvider(
      process.env.ETH_NETWORK,
      process.env.INFURA_API_KEY,
    );
    const contractAddress = config.Bookings;
    const abi = config.Bookings_abi;

    const mnemonic = process.env.MNEMONIC;
    const walletMnemonic = Wallet.fromMnemonic(mnemonic);
    const walletPrivateKey = new Wallet(walletMnemonic.privateKey);
    const wallet = new ethers.Wallet(walletPrivateKey, provider);

    const contract = new ethers.Contract(contractAddress, abi, wallet);
    walletMnemonic.address === walletPrivateKey.address;

    return contract;
  }

  async deleteBooking(booking_id: string, user: User) {
    try {
      // only booking owner can delete the booking
      const booking = await this.bookingRepository.findOne({
        where: { id: booking_id, user: { id: user.id } },
      });
      if (!booking) {
        throw new NotFoundException({
          error: 'Not Found',
          statusCode: 404,
          message: "Booking doesn't exist",
        });
      }
      const contract = await this.getContract();
      const response = await contract.deleteBooking(booking.uuid);
      await response.wait();
      if (response) {
        await this.bookingRepository.remove(booking);
        return { success: true };
      }
    } catch (err) {
      if ([404].includes(err.status)) throw err;
      console.error(err);
      throw new InternalServerErrorException();
    }
  }

  private async bookingExists(
    start_time: Date,
    end_time: Date,
    room_id: string,
  ) {
    const booking = await this.bookingRepository.findOne({
      where: [
        {
          start_time: Between(start_time, end_time),
          room: { id: room_id },
        },
        {
          end_time: Between(start_time, end_time),
          room: { id: room_id },
        },
        {
          start_time: LessThan(start_time),
          end_time: MoreThan(end_time),
          room: { id: room_id },
        },
      ],
    });
    return !!booking;
  }

  async myBookings(user: User) {
    try {
      const bookings = await this.bookingRepository.find({
        where: { user: { id: user.id } },
        order: { start_time: 'ASC' },
        relations: ['room'],
      });
      return bookings;
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException();
    }
  }

  async myRoomBookings(id: string, user: User) {
    try {
      const bookings = await this.bookingRepository.find({
        where: { user: { id: user.id }, room: { id: id } },
        order: { start_time: 'ASC' },
        relations: ['room'],
      });
      return bookings;
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException();
    }
  }
}
