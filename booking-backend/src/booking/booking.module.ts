import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Booking } from 'src/entities/booking.entity';
import { Room } from 'src/entities/room.entity';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';

@Module({
  imports: [TypeOrmModule.forFeature([Booking, Room]), AuthModule],
  controllers: [BookingController],
  providers: [BookingService],
})
export class BookingModule {}
