import React, { useReducer } from 'react';
import { connect } from 'react-redux';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { AXIS_GROUPS } from './App.constants';
import { AxisGroup, AxisOption } from './AxisOption.interface';


import { makeStyles, createStyles, Theme, ListSubheader, ListItem, Slider } from '@material-ui/core';
import { TimelineSliderActionTypes } from './TimelineSlider.actions';
import { TimelineSliderState } from './TimelineSlider.interface';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1
        }
    }),
);

interface ConnectedTimelineSliderProps {
    timelineSlider: TimelineSliderState;
    tick: Function;
}


const TimelineSlider:React.FC<ConnectedTimelineSliderProps> = (props) => {

    React.useEffect(() => {
        setTimeout(() => {
            props.tick()
        }, 1000);
    }, []);
    console.log('timelineSlider: ', props.timelineSlider);

    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Slider
                defaultValue={80}
                aria-labelledby="discrete-slider-always"
                step={1}
                marks={[{value: 2010}, {value: 2011}]}
                valueLabelDisplay="on"
            />
        </div>
    );
}

const mapStateToProps = (state: TimelineSliderState, props: any) => ({
    ...state,
    ...props
});

const mapDispatchToProps = (dispatch: Function, props: any) => ({
    tick: (): void => { 
        dispatch({
            type: TimelineSliderActionTypes.tick
        });
    }
});


export default connect(mapStateToProps, mapDispatchToProps)(TimelineSlider);