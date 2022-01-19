import styled from "styled-components";
import { spin } from "../animations";

export const LoaderWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

export const Loader = styled.div`
    width: 100px;
    width: 50px;
    height: 50px;
    background-color: transparent;
    border-radius: 50%;
    border: 4px solid ${props => props.theme.palette.primary.main};
    border-bottom-color: ${props => props.theme.palette.secondary.main};
    animation: ${spin} 1s ease-in-out infinite;
`;
