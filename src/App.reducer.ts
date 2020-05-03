import { controlPanelReducer, initialState as initialControlState } from './ControlPanel.reducer';
import { themeReducer, initialState as initialThemeState } from './Theme.reducer';
import { combineReducers } from 'redux';

export const initialState: any = {
  theme: initialThemeState,
  controlPanel: initialControlState
}

// This is the combined app-wide reducer containing the full state tree
export const appReducer = combineReducers({
  theme: themeReducer, controlPanel: controlPanelReducer
});