import { AXIS_GROUPS } from './App.constants';
import { AxisOption, AxisGroup } from './AxisOption.interface';
import { Planet } from './Planet.interface';

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

export function getCategories(planets: Planet[], axisAttribute: string): string[] {
    return planets.map(p => p[axisAttribute])
        .filter((value, index, self) => self.indexOf(value) === index);
}