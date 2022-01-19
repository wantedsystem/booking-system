import "styled-components";

interface IPalette {
    main: string;
    contrastText?: string;
}

declare module "styled-components" {
    export interface DefaultTheme {
        borderRadius: string;
        fontFamily: string;
        palette: {
            common: {
                black: string;
            };
            primary: IPalette;
            secondary: IPalette;
            error: IPalette;
        };
    }
}
