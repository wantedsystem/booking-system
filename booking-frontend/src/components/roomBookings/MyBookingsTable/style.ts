import styled from "styled-components";

export const TableRow = styled.div`
    width: 100%;
    background: white;
    padding: 1.25rem;
    border-radius: ${props => props.theme.borderRadius};
    display: flex;
    margin-bottom: 10px;
    justify-content: space-between;
`;

export const BookingDetail = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    flex: 1;
`;

export const BookingTransactionLink = styled.a`
    color: #7691b1;
    margin-top: 0.625rem;
    font-size: 0.8125rem;
    display: flex;
    align-items: center;
    span {
        line-break: anywhere;
    }
    &:hover {
        color: ${props => props.theme.palette.primary.main};
    }
    svg {
        flex-shrink: 0;
        color: ${props => props.theme.palette.primary.main};
        height: 15px;
    }
`;

export const BookingTime = styled.h3`
    font-size: 0.8rem;
    font-weight: 500;
    color: ${props => props.theme.palette.common.black};
`;

export const BookingDate = styled.p`
    font-size: 0.75rem;
    font-weight: 400;
    margin-top: 0.625rem;
    color: ${props => props.theme.palette.common.black};
`;

export const BookingIcon = styled.div`
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: ${props => props.theme.palette.primary.main};
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 1.25rem;
    svg {
        width: 20px;
        height: 20px;
        path {
            stroke: white;
        }
    }
`;

export const DeleteBooking = styled.div`
    cursor: pointer;
    flex-shrink: 0;
    svg {
        path {
            fill: ${props => props.theme.palette.error.main};
        }
    }
`;
