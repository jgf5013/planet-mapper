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

// https://learnwithparam.com/blog/how-to-group-by-array-of-objects-using-a-key/
export function getCategoriesWithCounts(planets: Planet[], axisAttribute: string, comparisonDate: Date, dateFilter: Function): any[] {
    let reduced = planets.reduce((result, currentValue) => {
        if (!result[currentValue[axisAttribute]]) {
            result[currentValue[axisAttribute]] = {
                key: currentValue[axisAttribute],
                count: 0
            };
        }
        if(dateFilter(comparisonDate, currentValue)) {
            result[currentValue[axisAttribute]].count += 1;
        }
        return result;
        }, {}
    );

    const reducedSortedValues = Object.values(reduced).sort((a: any, b: any) => (b.count - a.count));

    return reducedSortedValues;
}