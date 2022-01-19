import {
  Body,
  Controller,
  Post,
  Delete,
  Get,
  Param,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthUser } from 'src/auth/user.decorator';
import { User } from 'src/entities/user.entity';
import { SimpleParamsDto } from 'src/models/shared.model';
import { BookingRoom, BookingService } from './booking.service';
import { parse } from 'date-fns';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post('isvalid')
  @UseGuards(AuthGuard())
  bookingIsValid(@Body() booking: BookingRoom) {
    return this.bookingService.bookingIsValid(
      booking.roomId,
      new Date(booking.date),
      parse(booking.start_time, 'HH:mm', new Date(booking.date)),
      parse(booking.end_time, 'HH:mm', new Date(booking.date)),
    );
  }
  @Get(':id')
  @UseGuards(AuthGuard())
  getBooking(@Param() { id }: SimpleParamsDto) {
    return this.bookingService.getBooking(id);
  }

  @Get()
  @UseGuards(AuthGuard())
  getMyBookings(@AuthUser() user: User, @Body() booking: BookingRoom) {
    return this.bookingService.myBookings(user);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  deleteBooking(@Param() { id }: SimpleParamsDto, @AuthUser() user: User) {
    return this.bookingService.deleteBooking(id, user);
  }
}
