import { ControlPanelActionTypes } from './ControlPanel.actions';
import { ControlPanelState } from './ControlPanel.interface';
import { AXIS_GROUPS } from './App.constants';


export const initialState: ControlPanelState = {
    xAxis: AXIS_GROUPS[0].axes[0].attribute,
    yAxis: AXIS_GROUPS[1].axes[0].attribute,
    colorCategory: AXIS_GROUPS[2].axes[0].attribute
};

export function controlPanelReducer(state: ControlPanelState = initialState, action: any): ControlPanelState {
  console.group('controlPanelReducer ', action);
  console.log('state: ', state);
  let newState = { ...state };
  switch(action.type) {
    case ControlPanelActionTypes.changeAxis:
      newState[action.key] = action.value;
      break;
    default:
      console.warn('default...');
      // throw new Error();
  };
  console.log('newState: ', newState);
  console.groupEnd();
  return newState;
}