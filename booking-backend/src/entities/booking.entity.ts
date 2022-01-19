import { classToPlain } from 'class-transformer';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AbstractEntity } from './AbstractEntity';
import { Room } from './room.entity';
import { User } from './user.entity';

@Entity('bookings')
export class Booking extends AbstractEntity {
  constructor(
    user: User,
    room: Room,
    date: Date,
    start_time: Date,
    end_time: Date,
    transaction_id: string,
    uuid: string,
  ) {
    super();
    this.user = user;
    this.room = room;
    this.date = date;
    this.start_time = start_time;
    this.end_time = end_time;
    this.transaction_id = transaction_id;
    this.uuid = uuid;
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.bookings, {
    cascade: ['remove'],
    onDelete: 'CASCADE',
  })
  user: User;

  @ManyToOne(() => Room, (room) => room.bookings, {
    cascade: ['remove'],
    onDelete: 'CASCADE',
  })
  room: Room;

  @Column({ type: 'timestamp' })
  date: Date;

  @Column({ type: 'timestamp' })
  start_time: Date;

  @Column({ type: 'timestamp' })
  end_time: Date;

  @Column()
  transaction_id: string;

  @Column()
  uuid: string;

  toJSON() {
    this.user?.toJSON();
    return classToPlain(this);
  }
}
