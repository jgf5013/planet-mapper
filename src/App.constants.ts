import { AxisGroup } from "./AxisOption.interface";

export const AXIS_GROUPS: AxisGroup[] = [
    {
        category: "Planet",
        axes: [{
            label: "Planet's Mass",
            attribute: "pl_bmassj",
            units: "Jupiter Masses",
            type: "Numeric"
        }, {
            label: "Planet's Radius",
            attribute: "pl_radj",
            units: "Jupiter Radii",
            type: "Numeric"
        }, {
            label: "Planet's Density",
            attribute: "pl_dens",
            units: "g/cm³",
            type: "Numeric"
        }, {
            label: "Planet's Orbital Eccentricity",
            attribute: "pl_orbeccen",
            units: null,
            type: "Numeric"
        }, {
            label: "Planet's Orbital Inclination",
            attribute: "pl_orbincl",
            units: null,
            type: "Numeric"
        }, {
            label: "Number of Planets in System",
            attribute: "pl_pnum",
            units: null,
            type: "Numeric"
        }, {
            label: "Planet's Orbital Period",
            attribute: "pl_orbper",
            units: "Days",
            type: "Numeric"
        }, {
            label: "Planet's Orbital Period Error 1",
            attribute: "pl_orbpererr1",
            units: "Days",
            type: "Numeric"
        }, {
            label: "Planet's Orbital Period Error 2",
            attribute: "pl_orbpererr2",
            units: "Days",
            type: "Numeric"
        }, {
            label: "Planet's Orbital Period # of Measurements",
            attribute: "pl_orbpern",
            units: null,
            type: "Numeric"
        }]
    }, {
        category: "Star",
        axes: [{
            label: "Stellar Distance",
            attribute: "st_dist",
            units: "Light Years",
            type: "Numeric"
        }, {
            label: "Stellar Mass",
            attribute: "st_mass",
            units: "Solar Masses",
            type: "Numeric"
        }, {
            label: "Stellar Radius",
            attribute: "st_rad",
            units: "Solar Radii",
            type: "Numeric"
        }, {
            label: "Stellar Optical Magnitude",
            attribute: "st_optmag",
            units: "mag",
            type: "Numeric"
        }, {
            label: "Right Ascension",
            attribute: "ra",
            units: null,
            type: "Numeric"
        }, {
            label: "Declination",
            attribute: "dec",
            units: null,
            type: "Numeric"
        }]
    }, {
        category: "Discovery",
        axes: [{
            label: "Satellite/Observatory",
            attribute: "pl_facility",
            units: null,
            type: "Categorical"
        }, {
            label: "Discovery Date",
            attribute: "pl_publ_date", // TODO: Not sure if this is right
            units: null,
            type: "Date"
        }]
    }
];
