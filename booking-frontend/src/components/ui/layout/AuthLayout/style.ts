import styled from "styled-components";

export const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 600px;
    margin: auto;
    padding: 3.125rem 4.6875rem 3.75rem 4.6875rem;
    background: white;
    box-shadow: 0px 4px 58px -4px rgba(0, 0, 0, 0.06);
    border-radius: ${props => props.theme.borderRadius};
    .button {
        margin-top: 3.125rem;
    }
    @media (max-width: 500px) {
        padding: 2.5rem 5vmax;
    }
`;

export const FormTitle = styled.h1`
    font-size: 1.875rem;
    margin: 1.875rem 0;
    color: ${props => props.theme.palette.common.black};
`;

export const FormError = styled.div`
    font-size: 0.875rem;
    color: ${props => props.theme.palette.error.contrastText};
    background: ${props => props.theme.palette.error.main};
    margin-bottom: 1.875rem;
    padding: 0.75rem;
    border-radius: ${props => props.theme.borderRadius};
`;

export const FormLink = styled.div`
    font-size: 1rem;
    color: ${props => props.theme.palette.common.black};
    a {
        color: ${props => props.theme.palette.primary.main};
        &:hover {
            text-decoration: underline;
        }
    }
`;

export const AuthWrapper = styled.main`
    display: flex;
    height: 100vh;
    width: 100vw;
    @media (max-width: 1366px) {
        ${FormContainer} {
            max-width: 500px;
        }
        ${FormTitle} {
            font-size: 1.4rem;
        }
        ${FormLink} {
            font-size: 0.875rem;
        }
    }
`;
