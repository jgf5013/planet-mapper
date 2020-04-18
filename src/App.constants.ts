import { AxisOption } from "./AxisOption.interface";

export const AXIS_OPTIONS: AxisOption[] = [{
        key: 0,
        label: "Planet's Mass",
        attribute: "pl_bmassj",
        units: "Jupiter Masses"
    }, {
        key: 1,
        label: "Stellar Distance",
        attribute: "st_dist",
        units: "Light Years"
    }, {
        key: 2,
        label: "Planet's Orbital Inclination",
        attribute: "pl_orbincl",
        units: null
    }
]