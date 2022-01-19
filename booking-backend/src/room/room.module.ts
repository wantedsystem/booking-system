import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from 'src/entities/room.entity';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { AuthModule } from 'src/auth/auth.module';
import { BookingService } from 'src/booking/booking.service';
import { Booking } from 'src/entities/booking.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Room, Booking]), AuthModule],
  providers: [RoomService, BookingService],
  controllers: [RoomController],
})
export class RoomModule {}
