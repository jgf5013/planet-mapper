import { TimelineSliderActionTypes } from './TimelineSlider.actions';
import { TimelineSliderState } from './TimelineSlider.interface';


export const initialState: TimelineSliderState = {
  dateOffSet: 0,
  clock: null,
  clockState: 'STOPPED'
};

export function timelineSliderReducer(state: TimelineSliderState = initialState, action: any): TimelineSliderState {



    // console.group('timelineSliderReducer ', action);
    // console.log('state: ', state);
    let newState = { ...state };
    switch(action.type) {
      case TimelineSliderActionTypes.playClock:
        newState = {
          ...newState,
          clock: action.value,
          clockState: 'RUNNING'
        };
        break;
      case TimelineSliderActionTypes.tick:
        newState = {
          ...newState,
          dateOffSet: Math.min(
            newState.clockState === 'RUNNING' ? Number(state.dateOffSet) + 1 : Number(state.dateOffSet), //negative #
            0
          ),
          clockState: 'RUNNING'
        };
        break;
      case TimelineSliderActionTypes.set:
        newState = {
          ...newState,
          dateOffSet: Number(action.value)
        };
        break;
      case TimelineSliderActionTypes.pauseClock:
        newState = {
          ...newState,
          clockState: 'PAUSED'
        };
        break;
      case TimelineSliderActionTypes.stopClock:
        clearInterval(newState.clock);
        newState = {
          ...newState,
          clock: null,
          clockState: 'STOPPED'
        };
        break;
    };
    // console.log('newState: ', newState);
    // console.groupEnd();
    return newState;
}