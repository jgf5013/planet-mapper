import { AppActionTypes } from './App.actions';
import { AppState } from './App.interface';
// import { planetChartReducer, initialState as initialPlanetChartState } from './PlanetChart.reducer';
import { controlPanelReducer, initialState as initialControlState } from './ControlPanel.reducer';
import { timelineSliderReducer, initialState as initialTimelineSliderState } from './TimelineSlider.reducer';
import { themeReducer, initialState as initialThemeState } from './Theme.reducer';
import { combineReducers } from 'redux';

export const initialAppState: AppState = {
  planets: [],
  publicationDates: []
};

export function appReducer(state: AppState = initialAppState, action: any): AppState {
  // console.group('appReducer ', action);
  // console.log('state: ', state);
  let newState = { ...state };
  switch(action.type) {
    case AppActionTypes.setPlanets:
      newState['planets'] = [...action.value]
      break;
    case AppActionTypes.setPublicationDates:
      newState['publicationDates'] = action.value
      break;
    default:
      console.warn('default...');
      // throw new Error();
  };
  // console.log('newState: ', newState);
  // console.groupEnd();
  return newState;
}

export const initialCombinedState: any = {
  app: initialAppState,
  theme: initialThemeState,
  controlPanel: initialControlState,
  timeslider: initialTimelineSliderState
}


// This is the combined app-wide reducer containing the full state tree
export const combinedAppReducer = combineReducers({
  app: appReducer,
  theme: themeReducer,
  controlPanel: controlPanelReducer,
  timelineSlider: timelineSliderReducer
});