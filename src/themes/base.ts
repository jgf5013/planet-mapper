import { Theme, createMuiTheme, ThemeOptions } from "@material-ui/core";
import { lightTheme } from "./light";
import { darkTheme } from "./dark";

export function getThemeByName(themeKey: string): Theme {
  const theme: Theme = createMuiTheme({
    ...themeMap[themeKey],
    typography: {
    }
  });

  theme.typography.body1 = {

    fontSize: '0.8rem',
    [theme.breakpoints.up('md')]: {
      fontSize: '1rem',
    },
  }

  return theme;
}

const themeMap: { [key: string]: Partial<ThemeOptions> } = {
  lightTheme,
  darkTheme
};