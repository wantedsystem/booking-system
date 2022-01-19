import { IsString } from 'class-validator';

export class CreateRoomDto {
  @IsString()
  label: string;
}
