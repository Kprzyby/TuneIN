import colors from './colors';

export const fontFamilies = {
  header: 'Prata',
  body: 'Helvetica',
  logo: 'Zen Dots',
};

export const fontSizes = {
  fontSize10: '0.6rem',
  fontSize16: '1rem',
  fontSize24: '1.5rem',
  fontSize48: '3rem',
  fontSize72: '4.5rem',
  fontSize96: '6rem',
};

export const fontWeights = {
  bold: '700',
  regular: '400',
};

export const textStyles = {
  h1: {
    fontFamily: fontFamilies.body,
    fontSize: fontSizes.fontSize16,
    lineHeight: '1rem',
  },
  h2: {
    fontFamilies: fontFamilies.body,
    fontSizes: fontSizes.fontSize10,
    lineHeight: '1rem',
  },
  profileTitleS: {
    fontFamily: fontFamilies.header,
    fontSize: fontSizes.fontSize10,
    lineHeight: '1rem',
    color: 'white',
  },
  profileTitleB: {
    fonstFamily: fontFamilies.header,
    fontSize: fontSizes.fontSize48,
    lineHeight: '1rem',
    color: 'white',
  },
  profileName: {
    fontFamily: fontFamilies.header,
    fontSize: fontSizes.fontSize96,
    lineHeight: '1rem',
    color: 'white',
  },
  RegisterTitile: {
    fontFamily: fontFamilies.body,
    fontSize: fontSizes.fontSize96,
    fontWeight: fontWeights.bold,
    lineHeight: '1rem',
    color: colors.darkMainD,
  },
  RegisterSuccess: {
    fontFamily: fontFamilies.body,
    fontSize: fontSizes.fontSize48,
    color: colors.darkMainD,
  },
  PasswordTitile: {
    fontFamily: fontFamilies.logo,
    fontSize: fontSizes.fontSize96,
    lineHeight: '5rem',
    color: colors.darkMainD,
  },
  PasswordTileTitle: {
    fontFamily: fontFamilies.body,
    fontSize: fontSizes.fontSize16,
    color: colors.inputHint,
  },
  Logo: {
    fontFamily: fontFamilies.logo,
    fontSize: fontSizes.fontSize48,
  },
  Navigation: {
    fontFamily: fontFamilies.logo,
    fontSize: fontSizes.fontSize16,
  },
  Buttons: {
    fontFamily: fontFamilies.body,
    color: colors.darkMainD,
  },
  SongCard: {
    fontFamily: fontFamilies.body,
  },
  ConfirmationTitle: {
    fontFamily: fontFamilies.logo,
    fontSize: fontSizes.fontSize72,
    color: colors.white,
  },
  ConfirmationDesc: {
    fontFamily: fontFamilies.body,
    fontSize: fontSizes.fontSize48,
    color: colors.white,
  },
  HomepageText: {
    fontFamily: fontFamilies.body,
    color: colors.darkMainL,
  },
  ProfileNavbar: {
    fontFamily: fontFamilies.body,
    fontSize: fontSizes.fontSize24,
    color: colors.darkMainL,
  },
  EditorList: {
    fontFamily: fontFamilies.body,
    fontSize: fontSizes.fontSize24,
    color: colors.darkMain,
  },
  TuitionTopBarItem: {
    fontFamily: fontFamilies.body,
    fontSize: fontSizes.fontSize24,
    color: colors.darkMainD,
  },
};
