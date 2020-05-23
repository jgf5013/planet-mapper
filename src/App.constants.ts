import { AxisGroup } from "./AxisOption.interface";

export const AXIS_GROUPS: AxisGroup[] = [
    {
        category: "Planet",
        axes: [{
            label: "Planet's Mass",
            attribute: "pl_bmassj",
            units: "Jupiter Masses"
        }, {
            label: "Planet's Radius",
            attribute: "pl_radj",
            units: "Jupiter Radii"
        }, {
            label: "Planet's Density",
            attribute: "pl_dens",
            units: "g/cm³"
        }, {
            label: "Planet's Orbital Eccentricity",
            attribute: "pl_orbeccen",
            units: null
        }, {
            label: "Planet's Orbital Inclination",
            attribute: "pl_orbincl",
            units: null
        }, {
            label: "Number of Planets in System",
            attribute: "pl_pnum",
            units: null
        }, {
            label: "Planet's Orbital Period",
            attribute: "pl_orbper",
            units: "Days"
        }, {
            label: "Planet's Orbital Period Error 1",
            attribute: "pl_orbpererr1",
            units: "Days"
        }, {
            label: "Planet's Orbital Period Error 2",
            attribute: "pl_orbpererr2",
            units: "Days"
        }, {
            label: "Planet's Orbital Period Limit Flag",
            attribute: "pl_orbperlim",
            units: null
        }, {
            label: "Planet's Orbital Period # of Measurements",
            attribute: "pl_orbpern",
            units: null
        }]
    }, {
        category: "Star",
        axes: [{
            label: "Stellar Distance",
            attribute: "st_dist",
            units: "Light Years"
        }, {
            label: "Stellar Mass",
            attribute: "st_mass",
            units: "Solar Masses"
        }, {
            label: "Stellar Radius",
            attribute: "st_rad",
            units: "Solar Radii"
        }, {
            label: "Stellar Optical Magnitude",
            attribute: "st_optmag",
            units: "mag"
        }, {
            label: "Right Ascension",
            attribute: "ra",
            units: null
        }, {
            label: "Declination",
            attribute: "dec",
            units: null
        }]
    }
];
