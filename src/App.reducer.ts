import { AppState } from './App.interface';
import { AppActionTypes } from './App.actions';

// const appState = JSON.parse(localStorage.getItem('appState'));

export const initialState = {
  appTheme: localStorage.getItem('appTheme') || 'darkTheme'
};

export function appReducer(state: AppState, action: any): AppState {
    console.info('appReducer', 'state: ', state, 'action: ', action);
    switch(action.type) {
      case AppActionTypes.toggleTheme:
        const newState = {
          appTheme: state.appTheme === 'darkTheme' ? 'lightTheme' : 'darkTheme'
        };
        return newState;
      default:
        throw new Error();
    };
}