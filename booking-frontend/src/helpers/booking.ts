import { Booking } from "types/Booking";

export interface BookingEvent {
    [key: string]: Array<{
        [key: string]: string;
    }>;
}

export const formatBookingToCalendarEvents = (bookings: Booking[]) => {
    const events = bookings.reduce((group: BookingEvent, booking) => {
        const { date } = booking;
        const dateObj = new Date(date);
        const formattedDate = `${dateObj.getDay()}-${dateObj.getMonth()}-${dateObj.getFullYear()}`;
        group[formattedDate] = group[formattedDate] ?? [];
        group[formattedDate].push({
            id: booking.id,
            startAt: booking.start_time,
            endAt: booking.end_time,
            summary: booking.user.username,
            color: "blue",
            calendarID: "work"
        });
        return group;
    }, {});

    return events;
};
