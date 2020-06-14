import React, { createContext, ReactNode, useReducer } from 'react';
// import { themeReducer, initialState } from './Theme.reducer';
import { combinedAppReducer, initialCombinedState } from './App.reducer';


const AppStateContext = createContext<any>(initialCombinedState);



const StateProvider = ({ children }: { children: ReactNode }) => {

    
    // const [state, dispatch] = useReducer(themeReducer, initialCombinedState);
    const [state, dispatch] = useReducer(combinedAppReducer, initialCombinedState);

    return (
        <AppStateContext.Provider value={{state, dispatch}}>
            {children}
        </AppStateContext.Provider>
    );
}

export { AppStateContext, StateProvider };
