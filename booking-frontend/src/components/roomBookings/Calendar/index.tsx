import { BookingEvent } from "helpers/booking";
import Kalend, { CalendarView } from "kalend";
import "kalend/dist/styles/index.css";
import { CalendarWrapper } from "..";

interface Props {
    events: BookingEvent;
}

const Calendar: React.FunctionComponent<Props> = ({ events }) => {
    return (
        <CalendarWrapper>
            <Kalend
                events={events}
                initialDate={new Date().toISOString()}
                initialView={CalendarView.WEEK}
                disabledViews={[CalendarView.DAY]}
            />
        </CalendarWrapper>
    );
};

export default Calendar;
