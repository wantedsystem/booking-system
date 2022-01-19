import styled, { css } from "styled-components";

export const Label = styled.label`
    font-size: 0.875rem;
    font-weight: 500;
    color: ${props => props.theme.palette.common.black};
`;

export const InputButton = styled.div`
    height: 100%;
    width: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    position: absolute;
    right: 0;
    top: 0;
    &:hover {
        svg {
            path {
                fill: ${props => props.theme.palette.primary.main};
            }
        }
    }
`;

export const InputElement = styled.input`
    width: 100%;
    border-radius: ${props => props.theme.borderRadius};
    border: none;
    padding: 0.9375rem 0;
    padding-right: 0.75rem;
    height: 100%;
    font-size: 0.9375rem;
    text-indent: 0.9375rem;
    &[type="password"] {
        padding-right: 60px;
    }
`;

export const InputControl = styled.div`
    border-radius: ${props => props.theme.borderRadius};
    border: 2px solid #e8e8e8;
    margin-top: 0.625rem;
    height: 55px;
    display: flex;
    position: relative;
    transition: border-color 0.2s ease-in-out;
    &:focus-within,
    &:hover {
        border-color: ${props => props.theme.palette.primary.main};
    }
`;

export const InputError = styled.small`
    color: ${props => props.theme.palette.error.main};
    margin-top: 0.4375rem;
`;

interface IInputGroupProps {
    error?: string | boolean;
}

export const InputGroup = styled.div<IInputGroupProps>`
    display: flex;
    flex-direction: column;
    margin-bottom: 1.25rem;
    width: 100%;
    ${props =>
        props.error &&
        css`
            ${InputControl} {
                border-color: ${props.theme.palette.error.main};
                border-width: 1px;
            }
        `}
    @media (max-width: 1366px) {
        ${InputControl} {
            height: 45px;
        }
    }
`;
