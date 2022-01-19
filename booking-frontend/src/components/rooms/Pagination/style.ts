import styled from "styled-components";

export const PaginationWrapper = styled.div`
    display: flex;
    .button {
        margin-right: 10px;
        background: transparent;
        padding: 0.625rem;
        color: ${props => props.theme.palette.common.black};
        border: 2px solid #c8daef;
        span {
            font-size: 0.75rem;
        }
    }
`;
