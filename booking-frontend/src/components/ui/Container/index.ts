import styled from "styled-components";

export const Container = styled.div.attrs({
    className: "container"
})`
    max-width: 100%;
    width: 100%;
    margin-right: auto;
    margin-left: auto;
    padding-right: 2rem;
    padding-left: 2rem;
    @media (max-width: 640px) {
        padding-right: 1rem;
        padding-left: 1rem;
    }
    @media (min-width: 640px) {
        max-width: 600px;
    }

    @media (min-width: 768px) {
        max-width: 820px;
    }

    @media (min-width: 1024px) {
        max-width: 960px;
    }

    @media (min-width: 1280px) {
        max-width: 1140px;
    }

    @media (min-width: 1440px) {
        max-width: 1600px;
    }
`;
