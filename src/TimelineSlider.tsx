import React, { useReducer } from 'react';
import { connect } from 'react-redux';


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
    sliderValueChange: Function;
    publicationDates: string[];
}


const TimelineSlider:React.FC<ConnectedTimelineSliderProps> = (props) => {

    React.useEffect(() => {
        setTimeout(() => {
            props.tick()
        }, 1000);
    }, []);
    const classes = useStyles();

    if(!props.publicationDates || !props.publicationDates.length) {
        return (null);
    }

    const minPublicationDate = props.publicationDates[0];
    const maxPublicationDate = props.publicationDates[props.publicationDates.length - 1];
    return (
        <div className={classes.root}>
            <Slider
                aria-labelledby="discrete-slider-always"
                min={new Date(minPublicationDate).getTime()}
                max={new Date(maxPublicationDate).getTime()}
                defaultValue={new Date(maxPublicationDate).getTime()}
                marks={[{
                    value: new Date(minPublicationDate).getTime(),
                    label: minPublicationDate
                }, {
                    value: new Date(maxPublicationDate).getTime(),
                    label: maxPublicationDate
                }]}
                valueLabelFormat={(date) => {
                    return new Date(date).toISOString().slice(0, 10);
                }}
                onChange={(event, value) => props.sliderValueChange(value)}
                // valueLabelDisplay="on"
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
    },
    sliderValueChange: (d: number): void => {
        dispatch({
            type: TimelineSliderActionTypes.set,
            value: new Date(d)
        })
    }
});


export default connect(mapStateToProps, mapDispatchToProps)(TimelineSlider);