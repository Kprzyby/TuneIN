import Head from "next/head";
import React from "react";
import theme from "../src/setup/theme";
import type { AppProps } from "next/app";
import GlobalStyles from "../src/setup/theme/GlobalStyles";
import { ThemeProvider } from "styled-components";
import Main from "../src/components/layout/main"
import UserContext from "../src/components/context/UserContext";

const App = ({ Component, pageProps }: AppProps) => (
    <ThemeProvider {...{ theme }}>
        <GlobalStyles />
        <UserContext>
            <Main>
                <Component {...pageProps} />
            </Main>
        </UserContext>
    </ThemeProvider>
);

export default App;
