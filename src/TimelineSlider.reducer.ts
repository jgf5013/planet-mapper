import { TimelineSliderActionTypes } from './TimelineSlider.actions';
import { TimelineSliderState } from './TimelineSlider.interface';


export const initialState: TimelineSliderState = {
  date: new Date()
};

export function timelineSliderReducer(state: TimelineSliderState = initialState, action: any): TimelineSliderState {
    switch(action.type) {
      case TimelineSliderActionTypes.tick:
        var newDate = new Date();
        newDate.setDate(state.date.getDate()+1);
        const newState = {
          ...state,
          date: newDate
        };
        return newState;
      case TimelineSliderActionTypes.set:
        return {
          ...state,
          date: action.value
        };
      default:
        return state;
        // throw new Error();
    };
}