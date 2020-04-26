import React, { useState, createContext, useReducer, FunctionComponent, ReactNode, useContext } from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import { getThemeByName } from './themes/base';
import { AppState } from './App.interface';
import { appReducer, initialState } from './App.reducer';

const AppStateContext = createContext<AppState>(initialState);


const StateProvider = ({ children }: { children: ReactNode }) => {
    
  const [state, dispatch] = useReducer(appReducer, initialState);

  console.log(state);

    return (
        <AppStateContext.Provider value={state}>
            {children}
        </AppStateContext.Provider>
    );
}

export { AppStateContext, StateProvider };