import { AppState } from './App.interface';
import { AppActionTypes } from './App.actions';

// const appState = JSON.parse(localStorage.getItem('appState'));

export const initialState: AppState = {
  appTheme: localStorage.getItem('appTheme') || 'darkTheme',
  themeChecked: false
};

export function appReducer(state: AppState, action: any): AppState {
    console.info('appReducer', 'state: ', state, 'action: ', action);
    switch(action.type) {
      case AppActionTypes.toggleTheme:
        const newState = {
          ...state,
          appTheme: state.appTheme === 'darkTheme' ? 'lightTheme' : 'darkTheme',
          themeChecked: !state.themeChecked
        };
        return newState;
      default:
        throw new Error();
    };
}