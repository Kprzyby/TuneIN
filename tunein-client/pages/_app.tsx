import Head from "next/head";
import React from "react";
import theme from "../src/setup/theme";
import type { AppProps } from "next/app";
import GlobalStyles from "../src/setup/theme/GlobalStyles";
import { ThemeProvider } from "styled-components";
import Main from "../src/components/layout/main"

const App = ({ Component, pageProps }: AppProps) => (
    <ThemeProvider {...{ theme }}>
        <GlobalStyles />
        <Main>
            <Component {...pageProps} />
        </Main>
    </ThemeProvider>
);

export default App;
