import { ThemeState } from './Theme.interface';
import { ThemeActionTypes } from './Theme.actions';

export const initialState: ThemeState = {
  appTheme: localStorage.getItem('appTheme') || 'darkTheme',
  themeChecked: false
};

export function themeReducer(state: ThemeState = initialState, action: any): ThemeState {
    console.info('themeReducer', 'state: ', state, 'action: ', action);
    switch(action.type) {
      case ThemeActionTypes.toggleTheme:
        const newState = {
          ...state,
          appTheme: state.appTheme === 'darkTheme' ? 'lightTheme' : 'darkTheme',
          themeChecked: !state.themeChecked
        };
        return newState;
      default:
        return state;
        // throw new Error();
    };
};