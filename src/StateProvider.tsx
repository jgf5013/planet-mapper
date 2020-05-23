import React, { useState, createContext, useReducer, FunctionComponent, ReactNode, useContext } from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import { getThemeByName } from './themes/base';
import { ThemeState } from './Theme.interface';
// import { themeReducer, initialState } from './Theme.reducer';
import { appReducer, initialState } from './App.reducer';


const AppStateContext = createContext<any>(initialState);



const StateProvider = ({ children }: { children: ReactNode }) => {

    
    // const [state, dispatch] = useReducer(themeReducer, initialState);
    const [state, dispatch] = useReducer(appReducer, initialState);

    return (
        <AppStateContext.Provider value={{state, dispatch}}>
            {children}
        </AppStateContext.Provider>
    );
}

export { AppStateContext, StateProvider };