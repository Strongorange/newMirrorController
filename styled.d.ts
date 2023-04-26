import { CustomTheme } from "./src/styles/theme";

declare module "styled-components" {
  export interface DefaultTheme extends CustomTheme {}
}
