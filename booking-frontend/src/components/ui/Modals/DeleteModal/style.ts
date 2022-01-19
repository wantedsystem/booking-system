import styled from "styled-components";

export const ModalButtons = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 1.25rem;
    .button {
        padding: 0.8125rem;
        span {
            font-size: 0.9375rem;
        }
        &:first-of-type {
            margin-right: 1.25rem;
        }
    }
`;
