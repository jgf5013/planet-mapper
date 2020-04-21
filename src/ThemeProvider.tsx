import React, { useState } from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import { getThemeByName } from './themes/base';

export const ThemeContext = React.createContext((themeName: string): void => {
    
});


const ThemeProvider: React.FC = (props) => {
    // State to hold the selected theme name
    // Read current theme from localStorage or maybe from an api
    const curThemeName = localStorage.getItem('appTheme') || 'darkTheme';

    // State to hold the selected theme name
    const [themeName, _setThemeName] = useState(curThemeName);

    // Retrieve the theme object by theme name
    const theme = getThemeByName(themeName);

    const setThemeName = (themeName: string): void => {
        localStorage.setItem("appTheme", themeName);
        _setThemeName(themeName);
      }


    return (
        <ThemeContext.Provider value={setThemeName}>
            <MuiThemeProvider theme={theme}>{props.children}</MuiThemeProvider>
        </ThemeContext.Provider>
    );
}

export default ThemeProvider;