import React, { useReducer } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { AXIS_OPTIONS } from './App.constants';
import { AxisGroup, AxisOption } from './AxisOption.interface';


import { makeStyles, createStyles, Theme, ListSubheader, ListItem } from '@material-ui/core';
import { controlPanelReducer, initialState as initialControlPanelState } from './ControlPanel.reducer';
import { ControlPanelActionTypes } from './ControlPanel.actions';
// import { appReducer } from './App.reducer';


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


export function Axis(props: {stateKey: string, selectedValue: string, axisLabel: string}) {
    
    // const [state, dispatch] = useReducer(appReducer, initialState);
    const [state, dispatch] = useReducer(controlPanelReducer, initialControlPanelState);
    
    const handleAxisChange = (attribute: string): void => {
        dispatch({
            type: ControlPanelActionTypes.changeAxis,
            key: props.stateKey,
            value: attribute
        });
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
                    labelId="axis-select-label"
                    id="axis-select"
                    value={state[props.stateKey]}
                    onChange={event => handleAxisChange(event.target.value as string)}>
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
