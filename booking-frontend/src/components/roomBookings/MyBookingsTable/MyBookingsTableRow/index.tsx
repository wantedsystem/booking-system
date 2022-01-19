import CalendarIcon from "components/ui/Icons/CalendarIcon";
import DeleteIcon from "components/ui/Icons/Delete";
import { Booking } from "types/Booking";
import {
    BookingDate,
    BookingDetail,
    BookingIcon,
    BookingTime,
    BookingTransactionLink,
    DeleteBooking,
    TableRow
} from "../style";
import dayjs from "dayjs";
import DeleteModal from "components/ui/Modals/DeleteModal";
import { useState } from "react";
import { deleteBooking } from "services/booking";
import LinkIcon from "components/ui/Icons/Link";

interface Props {
    booking: Booking;
}

const MyBookingsTableRow: React.FunctionComponent<Props> = ({ booking }) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const { start_time, end_time, id, transaction_id } = booking;
    const start = dayjs(start_time).format("HH:mm");
    const end = dayjs(end_time).format("HH:mm");
    const date = dayjs(booking.date).format("MMMM D, YYYY");
    const handleDelete = async () => {
        await deleteBooking(id);
    };
    return (
        <>
            <TableRow>
                <BookingIcon>
                    <CalendarIcon />
                </BookingIcon>
                <BookingDetail>
                    <BookingTime>
                        {start} - {end}
                    </BookingTime>
                    <BookingDate>{date}</BookingDate>
                    {transaction_id && (
                        <BookingTransactionLink
                            href={`${process.env.NEXT_PUBLIC_ETHERSCAN_URL}${transaction_id}`}
                            target="_blank"
                        >
                            <span>{transaction_id}</span>
                            <LinkIcon />
                        </BookingTransactionLink>
                    )}
                </BookingDetail>
                <DeleteBooking onClick={() => setShowDeleteModal(true)}>
                    <DeleteIcon />
                </DeleteBooking>
            </TableRow>
            {showDeleteModal && (
                <DeleteModal
                    title="Delete Booking"
                    bodyText="Are you sure you want to delete this booking?"
                    onDelete={handleDelete}
                    onClose={() => {
                        setShowDeleteModal(false);
                    }}
                />
            )}
        </>
    );
};

export default MyBookingsTableRow;
