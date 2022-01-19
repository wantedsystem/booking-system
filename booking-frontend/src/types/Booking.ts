import { User } from "./User";
import { Room } from "./Room";

export interface Booking {
    id: string;
    date: string;
    end_time: string;
    start_time: string;
    transaction_id: string;
    user: User;
    room: Room;
    uuid: string;
}
