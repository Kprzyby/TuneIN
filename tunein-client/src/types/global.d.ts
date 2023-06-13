import { Theme } from "@setup/theme";

declare module "styled-components" {
  export type DefaultTheme = Theme;
}
export {};
