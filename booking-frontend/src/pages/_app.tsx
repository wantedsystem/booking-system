import type { AppProps } from "next/app";
import GlobalStyle from "components/theme/GlobalStyle";
import { ThemeProvider } from "styled-components";
import defaultTheme from "components/theme/theme";
import { Provider } from "react-redux";
import store from "redux/store";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Provider store={store}>
                <ThemeProvider theme={defaultTheme}>
                    <GlobalStyle />
                    <Component {...pageProps} />
                </ThemeProvider>
            </Provider>
        </>
    );
}

export default MyApp;
