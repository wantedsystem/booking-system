import { classToPlain } from 'class-transformer';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AbstractEntity } from './AbstractEntity';
import { Booking } from './booking.entity';

@Entity('rooms')
export class Room extends AbstractEntity {
  constructor(label: string) {
    super();
    this.label = label;
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: '32' })
  label: string;

  @OneToMany(() => Booking, (booking) => booking.room)
  bookings: Booking[];

  toJSON() {
    return classToPlain(this);
  }
}
