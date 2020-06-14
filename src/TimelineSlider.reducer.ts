import { TimelineSliderActionTypes } from './TimelineSlider.actions';
import { TimelineSliderState } from './TimelineSlider.interface';


export const initialState: TimelineSliderState = {
  dateOffSet: 0,
  clock: null
};

export function timelineSliderReducer(state: TimelineSliderState = initialState, action: any): TimelineSliderState {

    // console.group('timelineSliderReducer ', action);
    // console.log('state: ', state);
    let newState = { ...state };
    switch(action.type) {
      case TimelineSliderActionTypes.tick:
        newState = {
          ...newState,
          dateOffSet: Number(state.dateOffSet) + 1
        };
        break;
      case TimelineSliderActionTypes.set:
        newState = {
          ...newState,
          dateOffSet: Number(action.value)
        };
        break;
      case TimelineSliderActionTypes.stopClock:
        newState = {
          ...newState,
          clock: null
        };
        break;
      default:
        console.warn('default...');
        // throw new Error();
    };
    // console.log('newState: ', newState);
    // console.groupEnd();
    return newState;
}