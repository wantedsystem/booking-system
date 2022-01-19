import styled from "styled-components";

export const RoomFooter = styled.div`
    justify-content: flex-end;
    display: flex;
    padding-top: 10px;
    .button {
        background: transparent;
        border: 2px solid ${props => props.theme.palette.secondary.main};
        padding: 0.625rem;
        span {
            font-size: 0.8125rem;
        }
    }
`;

export const RoomTitle = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const RoomDetails = styled.div`
    display: flex;
    flex-direction: column;
    padding-left: 0.9375rem;
    flex: 1;
    h3 {
        font-weight: 500;
        font-size: 1rem;
        color: ${props => props.theme.palette.common.black};
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: calc(100% - 60px);
    }
    a {
        margin-top: 0.625rem;
        font-size: 0.875rem;
        cursor: pointer;
        color: #c0c2db;
        &:hover {
            color: ${props => props.theme.palette.primary.main};
        }
    }
`;

export const RoomImage = styled.div`
    padding: 0.9375rem;
    font-weight: 500;
    border: 2px solid #e8ebff;
    border-radius: ${props => props.theme.borderRadius};
    svg {
        path {
            fill: ${props => props.theme.palette.primary.main};
        }
    }
`;
export const RoomHeader = styled.header`
    display: flex;
    align-items: flex-start;
`;

export const DeleteRoom = styled.div`
    display: flex;
    cursor: pointer;
    svg {
        width: 24px;
        height: 24px;
        path {
            fill: ${props => props.theme.palette.error.main} !important;
        }
    }
`;
export const EditRoom = styled.div`
    display: flex;
    cursor: pointer;
    margin-right: 0.625rem;
    svg {
        width: 20px;
        height: 20px;
        path {
            fill: ${props => props.theme.palette.common.black} !important;
        }
    }
`;

export const RoomActions = styled.div`
    display: flex;
    flex-shrink: 0;
`;

export const RoomCardContainer = styled.div`
    width: 90%;
    margin-bottom: 10%;
    padding: 1.5625rem;
    background: white;
    border-radius: ${props => props.theme.borderRadius};
`;
export const RoomCardWrapper = styled.div`
    width: 25%;
    @media (max-width: 1440px) {
        width: 33%;
    }
    @media (max-width: 1024px) {
        width: 50%;
    }
    @media (max-width: 640px) {
        width: 100%;
        ${RoomCardContainer} {
            width: 100%;
        }
    }
`;
