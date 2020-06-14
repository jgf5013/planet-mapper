import { ThemeState } from './Theme.interface';
import { ThemeActionTypes } from './Theme.actions';

export const initialState: ThemeState = {
  appTheme: localStorage.getItem('appTheme') || 'darkTheme',
  themeChecked: false
};

export function themeReducer(state: ThemeState = initialState, action: any): ThemeState {
  // console.group('themeReducer ', action);
  // console.log('state: ', state);
  let newState = { ...state };
  switch(action.type) {
    case ThemeActionTypes.toggleTheme:
      newState = {
        ...state,
        appTheme: state.appTheme === 'darkTheme' ? 'lightTheme' : 'darkTheme',
        themeChecked: !state.themeChecked
      };
      break;
    default:
      console.warn('default...');
      // throw new Error();
  };
  // console.log('newState: ', newState);
  // console.groupEnd();
  return newState;
};