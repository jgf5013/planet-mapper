import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { AXIS_OPTIONS } from './App.constants';
import { AxisGroup, AxisOption } from './AxisOption.interface';


import { makeStyles, createStyles, Theme, ListSubheader, ListItem } from '@material-ui/core';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
    root: {
        flexGrow: 1
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    }),
);


export function Axis(props: {axis: string, axisLabel: string}) {
    
    const [axis, setAxis] = React.useState(props.axis);
    
    const handleXAxisChange = (attribute: string): void => {
        setAxis(attribute);
    };
    
    const renderSubList = (axisGroup: AxisGroup) => {
        if(!axisGroup) { return []; }
        const menuItems = axisGroup.axes.map((axis: AxisOption) => (
            <MenuItem key={`${axisGroup.category}-${axis.attribute}`} value={axis.attribute}>{axis.label}</MenuItem>
        ));
        return menuItems;
    };

    const classes = useStyles();
    return (
        <div className={classes.root}>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">{props.axisLabel}</InputLabel>
                <Select
                    labelId="x-axis-select-label"
                    id="x-axis-select"
                    value={axis}
                    onChange={event => handleXAxisChange(event.target.value as string)}>
                        {AXIS_OPTIONS.map((axisGroup: AxisGroup) => ([
                        <ListSubheader key={axisGroup.category}>{axisGroup.category}</ListSubheader>,
                        [...renderSubList(axisGroup)]
                        ])
                )}
                </Select>
            </FormControl>
        </div>
    );
}
