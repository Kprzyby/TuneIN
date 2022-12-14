import Head from "next/head";
import React from "react";
import theme from "../src/setup/theme";
import type { AppProps } from "next/app";
import GlobalStyles from "../src/setup/theme/GlobalStyles";
import { ThemeProvider } from "styled-components";
import Main from "../src/components/layout/main"

const App = ({ Component, pageProps }: AppProps) => (
    <ThemeProvider {...{ theme }}>
        <Head>
            {/*Fonts*/}
            <link href="https://fonts.googleapis.com/css2?family=Prata&display=swap" />
            <link href="https://fonts.googleapis.com/css2?family=La+Belle+Aurore&display=swap" rel="stylesheet"></link>
            <link href="https://fonts.googleapis.com/css2?family=Zen+Dots&display=swap" rel="stylesheet"></link>
        </Head>
        <GlobalStyles />
        <Main>
            <Component {...pageProps} />
        </Main>
    </ThemeProvider>
);

export default App;
