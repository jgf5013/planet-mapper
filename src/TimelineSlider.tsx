import { createStyles, Grid, Input, makeStyles, Slider, Theme } from '@material-ui/core';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import moment from 'moment';
import React from 'react';
import { connect } from 'react-redux';
import { AppState } from './App.interface';
import { TimelineSliderActionTypes } from './TimelineSlider.actions';
import { TimelineSliderState } from './TimelineSlider.interface';
import ReplayIcon from '@material-ui/icons/Replay';




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
    stopClocK: Function;
}


const TimelineSlider:React.FC<ConnectedTimelineSliderProps> = (props) => {

    const classes = useStyles();

    if(!props.publicationDates || !props.publicationDates.length) {
        return (null);
    }

    if(props.timelineSlider.clock && props.timelineSlider.dateOffSet === 0) {
        clearInterval(props.timelineSlider.clock);
        props.stopClocK();
    }

    const minPublicationDate = moment(props.publicationDates[0]);
    const today = moment();
    const yearsBetween = today.diff(minPublicationDate, 'years');
    const sliderDate = moment().add(props.timelineSlider.dateOffSet, 'years');
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
                    onChange={(event, value) => props.sliderValueChange(value)}
                />
            </Grid>
            <Grid item xs={4}>
                <Input
                    className={classes.inputDate}
                    disabled
                    value={sliderDate.toISOString().slice(0, 10)}/>
                    <span onClick={event => props.handleReplay()}><ReplayIcon /></span>
            </Grid>
        </Grid>
    );
}

const mapStateToProps = (state: any, props: any) => ({
    ...state,
    ...props
});

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
            type: TimelineSliderActionTypes.startClock,
            value: runningTimer
        });
    },
    stopClock: (): void => {
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


export default connect(mapStateToProps, mapDispatchToProps)(TimelineSlider);