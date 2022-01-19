import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    body {
        padding:0;
        margin:0;
        background:#f5f9ff;
    }

    html {
        box-sizing: border-box;
    }

    *, *:before, *:after {
        font-family: ${props => props.theme.fontFamily};
        box-sizing: inherit;
        outline: none;
    }

    h1, h2, h3, h4, h5, h6, p, ol, ul {
        margin: 0;
        padding: 0;
    }

    ol, ul {
        list-style: none;
    }

    a {
        text-decoration: none;
    }

    img {
        max-width: 100%;
        height: auto;
    }

    button {
        cursor: pointer;
    }

`;
