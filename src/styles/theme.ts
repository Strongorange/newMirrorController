import { DefaultTheme } from "styled-components";

interface colorsProps {
  MAIN: string;
}

export interface CustomTheme {
  colors: colorsProps;
}

const colors = {
  MAIN: "#F6EABE",
};

const theme: CustomTheme = {
  colors,
};

export default theme;
