import { createStyles, Grid, Input, makeStyles, Slider, Theme } from '@material-ui/core';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import moment from 'moment';
import React, { useReducer } from 'react';
import { connect } from 'react-redux';
import { TimelineSliderActionTypes } from './TimelineSlider.actions';
import { TimelineSliderState } from './TimelineSlider.interface';
import ReplayIcon from '@material-ui/icons/Replay';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import { timelineSliderReducer, initialState as initialTimelineSliderState } from './TimelineSlider.reducer';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        gridContainer: {
            alignItems: 'center'
        },
        inputDate: {
            top: '-5px'
        }
    }),
);


interface ConnectedTimelineSliderProps {
    publicationDates: string[],
    timelineSlider: TimelineSliderState;
    tick: Function;
    sliderValueChange: Function;
    handleReplay: Function;
    handlePlay: Function;
    handlePause: Function;
    stopClock: Function;
}


const TimelineSlider:React.FC<ConnectedTimelineSliderProps> = (props) => {

    const classes = useStyles();

    const [timelineSlider] = useReducer(timelineSliderReducer, initialTimelineSliderState);

    if(!props.publicationDates || !props.publicationDates.length) {
        return (null);
    }

    const minPublicationDate = moment(props.publicationDates[0]);
    const today = moment();
    const yearsBetween = today.diff(minPublicationDate, 'years');
    const sliderDate = moment().add(props.timelineSlider.dateOffSet, 'years');

    let ClockButton;
    if(timelineSlider.clockState === 'STOPPED') {
        ClockButton = <span onClick={event => props.handleReplay()}><ReplayIcon /></span>;
    } else if(timelineSlider.clockState === 'PAUSED') {
        ClockButton = <span onClick={event => props.handlePlay()}><PlayArrowIcon /></span>;
    } else if(timelineSlider.clockState === 'RUNNING') {
        ClockButton = <span onClick={event => props.handlePause()}><PauseIcon /></span>;
    }

    // TODO: This should really be handled in the mapped dispatch functions
    if(props.timelineSlider.dateOffSet >= 0) {
        clearInterval(props.timelineSlider.clock);
    }
    return (
        <Grid container className={classes.gridContainer} spacing={2}>
            <Grid item xs={1}>
                <CalendarTodayIcon />
            </Grid>
            <Grid item xs={7}>
                <Slider
                    aria-labelledby="discrete-slider-always"
                    min={-yearsBetween}
                    max={0}
                    value={props.timelineSlider.dateOffSet}
                    defaultValue={0}
                    step={1}
                    onChange={(event, value) => {
                        props.sliderValueChange(value);
                    }}
                />
            </Grid>
            <Grid item xs={4}>
                <Input
                    className={classes.inputDate}
                    disabled
                    value={sliderDate.toISOString().slice(0, 10)}/>
                {ClockButton}
            </Grid>
        </Grid>
    );
}

const mapStateToProps = (state: any, props: any) => {
    return {
        ...state,
        ...props
    };
};

const mapDispatchToProps = (dispatch: Function, props: any) => ({
    handleReplay: (): void => {
        const yearsBetween = moment().diff(props.publicationDates[0], 'years');
        dispatch({
            type: TimelineSliderActionTypes.set,
            value: -yearsBetween
        });
        const runningTimer = setInterval(() => {
            dispatch({
                type: TimelineSliderActionTypes.tick
            });

        }, 100);

        dispatch({
            type: TimelineSliderActionTypes.playClock,
            value: runningTimer
        });
    },
    handlePlay: (): void => {
        const runningTimer = setInterval(() => {
            dispatch({
                type: TimelineSliderActionTypes.tick
            });
            // props.stopClock();
        }, 100);

        dispatch({
            type: TimelineSliderActionTypes.playClock,
            value: runningTimer
        });
    },
    handlePause: (): void => {
        dispatch({
            type: TimelineSliderActionTypes.pauseClock
        })
    },
    stopClock: (clock: number): void => {
        clearInterval(clock);
        dispatch({
            type: TimelineSliderActionTypes.stopClock
        });
    },
    sliderValueChange: (daysBeforeToday: number): void => {
        dispatch({
            type: TimelineSliderActionTypes.set,
            value: daysBeforeToday
        });
    }
});

// export default TimelineSlider;
export default connect(mapStateToProps, mapDispatchToProps)(TimelineSlider);