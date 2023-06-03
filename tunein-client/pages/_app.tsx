import React from "react";
import { ThemeProvider } from "styled-components";
import theme from "@source/setup/theme";
import GlobalStyles from "@source/setup/theme/GlobalStyles";
import Main from "@components/layout/main";
import UserContext from "@components/context/UserContext";

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
