import styled from "styled-components";

export const Wallet = styled.div`
    display: flex;
    font-style: italic;
    background: #bdffc2;
    border-radius: 5px;
    padding: 0.9375rem;
    align-items: center;
    gap: 0.625rem;
`;

export const NavButtons = styled.div`
    display: flex;
    align-items: center;
    gap: 0.625rem;
`;

export const NavLink = styled.a`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-left: 1.25rem;
    height: 100%;
    font-weight: 500;
    font-size: 15px;
    color: ${props => props.theme.palette.common.black};
    border-bottom: 4px solid transparent;
    &:hover {
        border-bottom: 4px solid ${props => props.theme.palette.primary.main};
    }
`;

export const NavItems = styled.nav`
    margin-right: auto;
    height: 100%;
    ul {
        height: 100%;
        display: flex;
    }
`;

export const NavTitle = styled.h1`
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
    color: ${props => props.theme.palette.common.black};
`;
export const NavBar = styled.header`
    display: flex;
    background: white;
    height: 100px;
    width: 100%;
    position: fixed;
    top: 0%;
    left: 0;
    flex-shrink: 0;
    z-index: 2;
    .container {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
`;

export const ContentHeader = styled.header`
    display: flex;
    padding: 30px 0;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    > span {
        font-size: 1.2rem;
        margin-top: 10px;
    }
    .button {
        margin-top: 10px;
        span {
            font-size: 0.9375rem;
        }
    }
`;

export const ContentBody = styled.article`
    flex: 1;
    display: flex;
    flex-direction: column;
`;
export const MainContent = styled.div`
    display: flex;
    margin-top: 100px;
    flex: 1;
    .container {
        height: 100%;
        display: flex;
        flex-direction: column;
    }
`;

export const AppLayoutWrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100%;
    overflow: auto;
    @media (max-width: 1400px) {
        padding-bottom: 1vmax;
    }
    @media (max-width: 500px) {
        ${NavTitle} {
            display: none;
        }
    }
`;
