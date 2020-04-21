import { createMuiTheme, ThemeOptions } from '@material-ui/core';

// export const lightTheme = createMuiTheme({
//   palette: {
//     type: 'light',
//     primary: {
//       main: '#282c34'
//     }
//   }
// });

export const lightTheme: Partial<ThemeOptions> = {
  palette: {
    type: 'light',
    primary: {
      main: '#282c34'
    }
  }
};