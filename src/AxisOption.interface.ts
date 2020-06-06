export interface AxisGroup {
    category: string;
    axes: AxisOption[]
}

export interface AxisOption {
    label: string;
    attribute: string;
    units: string | null;
    type: string;
}