import "styled-components";

export const Theme = {
  colors: {
    neutral: "#FAFAFA",
    neutralLight: "#FFFFFF",
    neutralMedium: "#535F5F",
    neutralDark: "#2A3535",
    primary: "#057D88",
    primaryDark: "#004F56",
    primaryMedium: "#32B7B7",
    secondary: "#FF7600",
    secondaryLight: "#FFE5D5",
    background: "#DEE1E6",
  },
  devices: {
    laptop: "1200px",
    tablet: "800px",
    mobile: "500px",
  },
};

export type ITheme = typeof Theme;

declare module "styled-components" {
  export interface DefaultTheme extends ITheme {}
}
