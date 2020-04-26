import { AxisOption, AxisGroup } from "./AxisOption.interface";
import { Theme } from "@material-ui/core";
import { getThemeByName } from "./themes/base";

// export const THEMES: any = {
//     lightTheme: ,
//     darkTheme: getThemeByName('darkTheme')
// }

export const AXIS_OPTIONS: AxisGroup[] = [
    {
        category: "Planet",
        axes: [{
            label: "Planet's Mass",
            attribute: "pl_bmassj",
            units: "Jupiter Masses"
        }, {
            label: "Planet's Orbital Inclination",
            attribute: "pl_orbincl",
            units: null
        }]
    }, {
        category: "Star",
        axes: [{
            label: "Stellar Distance",
            attribute: "st_dist",
            units: "Light Years"
        }]
    }
];