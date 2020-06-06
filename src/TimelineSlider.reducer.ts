import { TimelineSliderActionTypes } from './TimelineSlider.actions';
import { TimelineSliderState } from './TimelineSlider.interface';


export const initialState: TimelineSliderState = {
  date: new Date(1990, 0, 1) //TODO: pull it dynamically based off of data (minus 15 years?)
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
      default:
        return state;
        // throw new Error();
    };
}