import { ControlPanelActionTypes } from './ControlPanel.actions';
import { ControlPanelState } from './ControlPanel.interface';
import { AXIS_OPTIONS } from './App.constants';


export const initialState: ControlPanelState = {
    xAxis: AXIS_OPTIONS[0].axes[0].attribute,
    yAxis: AXIS_OPTIONS[1].axes[0].attribute
};

export function controlPanelReducer(state: ControlPanelState, action: any): ControlPanelState {
  console.log('controlPanelReducer: ', state, action);
    switch(action.type) {
      case ControlPanelActionTypes.changeAxis:
        const newState = {
          ...state,
        };
        newState[action.key] = action.value;
        console.log('controlPanelReducer: ', state, newState);
        return newState;
      default:
        return state;
        // throw new Error();
    };
}