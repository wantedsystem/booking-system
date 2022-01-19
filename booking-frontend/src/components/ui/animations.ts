import { keyframes } from "styled-components";

export const spin = keyframes`
  to {
    transform: rotate(1turn);
  }
`;

export const spinCenter = keyframes`
  to {
    transform: translate(-50%, -50%) rotate(1turn);
  }
`;

export const buttonScaleOut = keyframes`
  0% {
        transform: scale(1);
    }

    30% {
        transform: scale(1.06);
    }

    60% {
        transform: scale(1.02);
    }

    100% {
        transform: scale(1.03);
    }
`;

export const buttonScaleIn = keyframes`
    100% {
        transform: scale(1);
    }

    60% {
        transform: scale(1.02);
    }

    30% {
        transform: scale(1);
    }

    0% {
        transform: scale(1.06);
    }
`;
