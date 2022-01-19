import { AppLayout } from "components/ui/layout/AppLayout";
import PageLoader from "components/ui/PageLoader";
import { withAuth } from "hoc/withAuth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getMyRoomBookings, getRoomBookings } from "services/room";
import { BookingEvent, formatBookingToCalendarEvents } from "helpers/booking";
import { RoomBookingHeader } from "components/bookingRoom";
import Button from "components/ui/Button";
import Calendar from "components/roomBookings/Calendar";
import MyRoomBookingsTable from "components/roomBookings/MyBookingsTable";
import { Booking } from "types/Booking";

const BookRoom: React.FunctionComponent = () => {
    const [bookings, setBookings] = useState<BookingEvent | null>();
    const [myBookings, setMyBookings] = useState<Booking[]>();
    const [isLoading, setIsLoading] = useState(true);
    const [toggleMyBookings, setToggleMybookings] = useState(true);
    const router = useRouter();

    useEffect(() => {
        if (router.query.id) {
            const roomId = router.query.id as string;
            getRoomBookings(roomId)
                .then(res => {
                    const events = formatBookingToCalendarEvents(res.data);
                    setBookings(events);
                })
                .catch(() => {
                    router.push("/rooms");
                })
                .finally(() => {
                    setIsLoading(false);
                });
            getMyRoomBookings(roomId)
                .then(res => {
                    setMyBookings(res.data);
                })
                .catch(() => {
                    router.push("/rooms");
                });
        }
    }, [router]);

    return isLoading || !bookings || !myBookings ? (
        <PageLoader />
    ) : (
        <AppLayout metaTitle="Room bookings" title="Room bookings">
            <RoomBookingHeader>
                <Button
                    secondary
                    active={toggleMyBookings}
                    onClick={() => setToggleMybookings(!toggleMyBookings)}
                >
                    My bookings
                </Button>
                <Button
                    secondary
                    active={!toggleMyBookings}
                    onClick={() => setToggleMybookings(!toggleMyBookings)}
                >
                    All bookings
                </Button>
            </RoomBookingHeader>
            {toggleMyBookings ? (
                <MyRoomBookingsTable bookings={myBookings} />
            ) : (
                <Calendar events={bookings} />
            )}
        </AppLayout>
    );
};

export default withAuth(BookRoom);
