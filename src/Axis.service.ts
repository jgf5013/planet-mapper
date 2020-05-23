import { AXIS_GROUPS } from './App.constants';
import { AxisOption, AxisGroup } from './AxisOption.interface';

export function getLabelFromKey (axisAttribute: string):AxisOption  {
    let matchingAxis: AxisOption[] = [];
    AXIS_GROUPS.some((axisGroup: AxisGroup) => {
        matchingAxis = axisGroup.axes.filter((axisOption: AxisOption) => {
            return axisOption.attribute === axisAttribute;
        });
        if(matchingAxis.length) {
            return true;
        }
    });
    return matchingAxis[0];

}