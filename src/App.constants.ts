import { AxisOption } from "./AxisOption.interface";

export const AXIS_OPTIONS: AxisOption[] = [{
        label: "Planet's Mass",
        attribute: "pl_bmassj",
        units: "Jupiter Masses"
    }, {
        label: "Stellar Distance",
        attribute: "st_dist",
        units: "Light Years"
    }, {
        label: "Planet's Orbital Inclination",
        attribute: "pl_orbincl",
        units: null
    }
]