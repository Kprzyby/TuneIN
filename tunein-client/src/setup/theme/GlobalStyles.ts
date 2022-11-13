import { normalize } from "styled-normalize";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import theme from "./index"

const GlobalStyles = createGlobalStyle`
    ${normalize};
    ${reset};
    * {
      box-sizing: border-box;
    }
    body{
        font-family: ${theme.fonts.body};
        font-size: 16px;
        font-weight: ${theme.fontWeights.regular};
        color: ${theme.colors.DarkGrey};
        overflow-x: hidden;
        width: 100%;
    }
    a{
        color: inherit;
        text-decoration: none;
    }
`;

export default GlobalStyles;
