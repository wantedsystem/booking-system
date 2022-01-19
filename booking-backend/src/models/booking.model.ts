import { IsDateString, IsMilitaryTime, IsString } from 'class-validator';

export class BookRoomDto {
  @IsDateString()
  date: string;

  @IsMilitaryTime()
  start_time: string;

  @IsMilitaryTime()
  end_time: string;

  @IsString()
  transaction_id: string;

  @IsString()
  uuid: string;
}
