import React from "react";
import { ThemeProvider } from "styled-components";

import theme from "../src/setup/theme";
import GlobalStyles from "../src/setup/theme/GlobalStyles";
import Main from "../src/components/layout/main";
import UserContext from "../src/components/context/UserContext";

import type { AppProps } from "next/app";

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
