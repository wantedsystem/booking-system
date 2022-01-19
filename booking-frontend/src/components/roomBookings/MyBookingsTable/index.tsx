import { Booking } from "types/Booking";
import MyBookingsTableRow from "./MyBookingsTableRow";

interface Props {
    bookings?: Booking[];
}

const MyRoomBookingsTable: React.FunctionComponent<Props> = ({ bookings }) => {
    return (
        <>
            {bookings?.map((booking, i) => (
                <MyBookingsTableRow booking={booking} key={i} />
            ))}
        </>
    );
};

export default MyRoomBookingsTable;
