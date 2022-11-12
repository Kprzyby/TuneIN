import Head from "next/head";
import React from "react";
import type { AppProps } from "next/app";

const App = ({ Component, pageProps }: AppProps) => (
    <>
    <Head>
        <link href="https://fonts.googleapis.com/css2?family=Prata&display=swap" />
    </Head>
    <Component {...pageProps} />
    </>
);

export default App;
