import { createStyles, Grid, Input, makeStyles, Slider, Theme } from '@material-ui/core';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import moment from 'moment';
import React from 'react';
import { connect } from 'react-redux';
import { AppState } from './App.interface';
import { TimelineSliderActionTypes } from './TimelineSlider.actions';
import { TimelineSliderState } from './TimelineSlider.interface';




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
}


const TimelineSlider:React.FC<ConnectedTimelineSliderProps> = (props) => {

    // React.useEffect(() => {
    //     setTimeout(() => {
    //         props.tick()
    //     }, 1000);
    // }, []);
    const classes = useStyles();
    // const [app] = useReducer(appReducer, initialAppState);
    // console.log('TLS app: ', app);
    console.log('TLS props: ', props);

    if(!props.publicationDates || !props.publicationDates.length) {
        return (null);
    }

    const minPublicationDate = moment(props.publicationDates[0]);
    const maxPublicationDate = moment(props.publicationDates[props.publicationDates.length - 1]);
    const today = moment();
    const monthsBetween = today.diff(minPublicationDate, 'months') + 1;
    console.log('monthsBetween: ', monthsBetween);
    return (
        <Grid container className={classes.gridContainer} spacing={2}>
            <Grid item xs={1}>
                <CalendarTodayIcon />
            </Grid>
            <Grid item xs={7}>
                <Slider
                    aria-labelledby="discrete-slider-always"
                    min={0}
                    max={monthsBetween}
                    defaultValue={monthsBetween}
                    step={1}
                    onChange={(event, value) => props.sliderValueChange(value)}
                />
            </Grid>
            <Grid item xs={4}>
                <Input
                    className={classes.inputDate}
                    disabled
                    value={props.timelineSlider.date.toISOString().slice(0, 10)}/>
            </Grid>
        </Grid>
    );
}

const mapStateToProps = (state: any, props: any) => ({
    ...state,
    ...props
});

const mapDispatchToProps = (dispatch: Function, props: any) => ({
    tick: (): void => { 
        dispatch({
            type: TimelineSliderActionTypes.tick
        });
    },
    sliderValueChange: (daysSinceMinimum: number): void => {
        const newSliderDate = moment(props.publicationDates[0]).add(daysSinceMinimum, 'months');
        dispatch({
            type: TimelineSliderActionTypes.set,
            value: newSliderDate.toDate()
        })
    }
});


export default connect(mapStateToProps, mapDispatchToProps)(TimelineSlider);