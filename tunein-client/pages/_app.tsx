import Head from "next/head";
import React from "react";
import theme from "../src/setup/theme";
import type { AppProps } from "next/app";
import GlobalStyles from "../src/setup/theme/GlobalStyles";
import { ThemeProvider } from "styled-components";

const App = ({ Component, pageProps }: AppProps) => (
    <ThemeProvider {...{ theme }}>
        <Head>
            <link href="https://fonts.googleapis.com/css2?family=Prata&display=swap" />
        </Head>
        <GlobalStyles />
        <Component {...pageProps} />
    </ThemeProvider>
);

export default App;
