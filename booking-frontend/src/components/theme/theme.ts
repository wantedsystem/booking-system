import { DefaultTheme } from "styled-components";

const defaultTheme: DefaultTheme = {
    borderRadius: "8px",
    fontFamily: "Inter, sans-serif",
    palette: {
        common: {
            black: "#08284D"
        },
        primary: {
            main: "#0071FF",
            contrastText: "#FFFFFF"
        },
        secondary: {
            main: "#EDF8FF",
            contrastText: "#0071FF"
        },
        error: {
            main: "#ff6e6e",
            contrastText: "#FFFFFF"
        }
    }
};

export default defaultTheme;
