import colors from "./colors";

export const fontFamilies = {
    header: "Prata",
    body: "Helvetica"
  };
  
export const fontSizes = {
    fontSize10: "0.6rem",
    fontSize16: "1rem",
    fontSize24: "1.5rem",
    fontSize48: "3rem",
    fontSize72: "4.5rem",
    fontSize96: "6rem"
};

export const fontWeights = {
    bold: "700",
    regular: "400"
};

export const textStyles = {
    h1: {
        fontFamily: "header",
        fontSize: "fontSize15",
        lineHeight: "1rem"
    },
    h2: {
        fontFamilies: "body",
        fontSizes: "fontSize10",
        lineHeight: "1rem"
    },
    profileTitleS: {
        fonstFamily: "header",
        fontSize: "fontSize16",
        lineHeight: "1rem",
        color: "white"
    },
    profileTitleB: {
        fonstFamily: "header",
        fontSize: "fontSize48",
        lineHeight: "1rem",
        color: "white"
    },
    profileName: {
        fonstFamily: "header",
        fontSize: "fontSize96",
        lineHeight: "1rem",
        color: "white"
    },
    RegisterTitile: {
        fonstFamily: "header",
        fontSize: "fontSize96",
        lineHeight: "1rem",
        color: colors.darkMainD
    },
    RegisterSuccess: {
        fonstFamily: "header",
        fontSize: "fontSize48",
        color: "white"
    },
    PasswordTitile: {
        fonstFamily: "header",
        fontSize: "fontSize96",
        lineHeight: "5rem",
        color: colors.darkMainD
    },
};
  