import styled from "styled-components";

export const CalendarWrapper = styled.div`
    width: 100%;
    min-height: 600px;
    max-height: 750px;
    flex: 1;
    display: flex;
    border: 1px solid #fff;
    border-radius: 12px;
    justify-content: center;
    align-items: center;
    background: #fff;
    box-shadow: 0px 4px 58px -4px rgba(0, 0, 0, 0.06);
    .Kalend__CalendarBody {
        width: 100% !important;
    }

    .Kalend__CalendarHeaderDates__circle-today,
    .Kalend__CalendarHeaderDates__circle-today-dark {
        background: ${props => props.theme.palette.primary.main};
    }
`;
