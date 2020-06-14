import { TimelineSliderActionTypes } from './TimelineSlider.actions';
import { TimelineSliderState } from './TimelineSlider.interface';


export const initialState: TimelineSliderState = {
  date: new Date()
};

export function timelineSliderReducer(state: TimelineSliderState = initialState, action: any): TimelineSliderState {

    console.group('timelineSliderReducer ', action);
    console.log('state: ', state);
    let newState = { ...state };
    switch(action.type) {
      case TimelineSliderActionTypes.tick:
        var newDate = new Date();
        newDate.setDate(state.date.getDate()+1);
        newState = {
          ...newState,
          date: newDate
        };
        break;
      case TimelineSliderActionTypes.set:
        newState = {
          ...newState,
          date: action.value
        };
        break;
      default:
        console.warn('default...');
        // throw new Error();
    };
    console.log('newState: ', newState);
    console.groupEnd();
    return newState;
}