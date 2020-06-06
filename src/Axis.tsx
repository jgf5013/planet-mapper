import React, { useReducer } from 'react';
import { connect } from 'react-redux';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { AXIS_GROUPS } from './App.constants';
import { AxisGroup, AxisOption } from './AxisOption.interface';


import { makeStyles, createStyles, Theme, ListSubheader, ListItem } from '@material-ui/core';
import { controlPanelReducer, initialState as initialControlPanelState } from './ControlPanel.reducer';
import { ControlPanelActionTypes } from './ControlPanel.actions';
import { ControlPanelState } from './ControlPanel.interface';
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

// interface ControlPanelProps {
//     axisLabel: string;
//     selectedValue: string;
//     stateKey: string;
// }

interface ConnectedControlPanelProps {
    axisLabel: string;
    controlPanel: ControlPanelState;
    handleAxisChange: Function;
    selectedValue: string;
    stateKey: string;
    type: string;
}

const Axis:React.FC<ConnectedControlPanelProps> = (props) => {
    
    const renderSubList = (axisGroup: AxisGroup, type: string) => {
        if(!axisGroup) { return []; }
        const menuItems = axisGroup.axes
            .filter((axis: AxisOption) => (axis.type === type))
            .map((axis: AxisOption) => (
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
                    value={props.controlPanel[props.stateKey]}
                    onChange={event => props.handleAxisChange(event.target.value as string)}>
                        {AXIS_GROUPS.map((axisGroup: AxisGroup) => ([
                        <ListSubheader key={axisGroup.category}>{axisGroup.category}</ListSubheader>,
                        [...renderSubList(axisGroup, props.type)]
                        ])
                )}
                </Select>
            </FormControl>
        </div>
    );
}

const mapStateToProps = (state: ControlPanelState, props: any) => ({
    ...state,
    ...props    
});

const mapDispatchToProps = (dispatch: Function, props: any) => ({
    handleAxisChange: (attribute: string): void => { 
        dispatch({
            type: ControlPanelActionTypes.changeAxis,
            key: props.stateKey,
            value: attribute
        });
    }
});


export default connect(mapStateToProps, mapDispatchToProps)(Axis);