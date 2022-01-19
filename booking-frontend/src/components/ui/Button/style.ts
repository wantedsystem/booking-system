import styled, { css } from "styled-components";
import {
    buttonScaleIn,
    buttonScaleOut,
    spinCenter
} from "components/ui/animations";

interface IButtonElement {
    fullWidth?: boolean;
    isLoading?: boolean;
    secondary?: boolean;
    danger?: boolean;
    active?: boolean;
}
export const ButtonElement = styled.button.attrs({
    className: "button"
})<IButtonElement>`
    background: ${props => props.theme.palette.primary.main};
    color: ${props => props.theme.palette.primary.contrastText};
    border: none;
    padding: 1rem 1.25rem;
    font-weight: 500;
    font-size: 0.9375rem;
    border-radius: ${props => props.theme.borderRadius};
    display: flex;
    text-align: center;
    position: relative;
    ${props => props.fullWidth && "width: 100%"};
    span {
        flex: 1;
        display: flex;
        gap: 0.625rem;
        align-items: center;
        justify-content: center;
    }
    ${props =>
        props.active &&
        `
        border: 2px solid ${props.theme.palette.primary.main} !important;
    `}
    ${props =>
        props.secondary &&
        `
        color: ${props.theme.palette.secondary.contrastText};
        background: ${props.theme.palette.secondary.main};
    `}
    ${props =>
        props.danger &&
        `
        color: ${props.theme.palette.error.contrastText};
        background: ${props.theme.palette.error.main};
    `}
    ${props =>
        props.isLoading &&
        css`
            &:after {
                content: "";
                background: ${props.theme.palette.primary.main};
                width: 100%;
                height: 100%;
                border-radius: ${props.theme.borderRadius};
                position: absolute;
                top: 0;
                left: 0;
                ${props.danger &&
                `
                    background: ${props.theme.palette.error.main};
                `}
            }

            &:before {
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                width: 25px;
                height: 25px;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                background-color: transparent;
                border-radius: 50%;
                border: 2px solid white;
                border-bottom-color: transparent;
                z-index: 1;
                animation: ${spinCenter} 1s linear infinite;
            }
        `};

    animation: ${buttonScaleIn} 0.4s ease-in-out forwards;
    &:hover {
        animation: ${buttonScaleOut} 0.4s ease-in-out forwards;
    }

    @media (max-width: 1366px) {
        padding: 0.9375rem;
        span {
            font-size: 0.9375rem;
        }
    }
`;
