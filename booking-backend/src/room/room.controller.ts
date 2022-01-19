import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { parse } from 'date-fns';
import { AdminGuard } from 'src/auth/admin.guard';
import { AuthUser } from 'src/auth/user.decorator';
import { BookingService } from 'src/booking/booking.service';
import { User } from 'src/entities/user.entity';
import { BookRoomDto } from 'src/models/booking.model';
import { CreateRoomDto } from 'src/models/room.model';
import {
  PaginationAndSortParams,
  SimpleParamsDto,
} from 'src/models/shared.model';
import { RoomService } from './room.service';

@Controller('room')
export class RoomController {
  constructor(
    private readonly roomService: RoomService,
    private readonly bookingService: BookingService,
  ) {}

  private route = '/api/room';

  @Get()
  @UseGuards(AuthGuard())
  getAllRooms(
    @Query() { page, perPage, order, field }: PaginationAndSortParams,
  ) {
    return this.roomService.getAllRooms(
      {
        limit: perPage,
        page,
        route: `${this.route}/`,
      },
      {
        order,
        field,
      },
    );
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  getRoom(@Param() { id }: SimpleParamsDto) {
    return this.roomService.getRoom(id);
  }

  @Get(':id/bookings')
  @UseGuards(AuthGuard())
  getAllRoomBookings(@Param() { id }: SimpleParamsDto) {
    return this.bookingService.getAllRoomBookings(id);
  }

  @Get(':id/mybookings')
  @UseGuards(AuthGuard())
  getMyRoomBookings(@Param() { id }: SimpleParamsDto, @AuthUser() user: User) {
    return this.bookingService.myRoomBookings(id, user);
  }

  @Post()
  @UseGuards(AuthGuard(), new AdminGuard())
  createRoom(@Body() { label }: CreateRoomDto) {
    return this.roomService.createRoom(label);
  }

  @Post(':id/book')
  @UseGuards(AuthGuard())
  bookRoom(
    @Param() { id }: SimpleParamsDto,
    @AuthUser() user: User,
    @Body() body: BookRoomDto,
  ) {
    return this.bookingService.bookRoom(
      user,
      id,
      new Date(body.date),
      parse(body.start_time, 'HH:mm', new Date(body.date)),
      parse(body.end_time, 'HH:mm', new Date(body.date)),
      body.transaction_id,
      body.uuid
    );
  }

  @Put(':id')
  @UseGuards(AuthGuard(), new AdminGuard())
  editRoom(@Param() { id }: SimpleParamsDto, @Body() { label }: CreateRoomDto) {
    return this.roomService.editRoom(id, label);
  }

  @Delete(':id')
  @UseGuards(AuthGuard(), new AdminGuard())
  deleteRoom(@Param() { id }: SimpleParamsDto) {
    return this.roomService.deleteRoom(id);
  }
}
