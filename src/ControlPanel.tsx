import { createStyles, Grid, makeStyles, Theme, Typography, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { AXIS_GROUPS } from './App.constants';
import Axis from './Axis';
import { initialState } from './ControlPanel.reducer';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TimelineSlider from './TimelineSlider';



const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexShrink: 0,
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
    elementContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between'
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

interface ConnectedControlPanelProps {
  publicationDates: string[],
}


const ControlPanel:React.FC<ConnectedControlPanelProps> = (props) => {

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState<string | false>(false);

  useEffect(() => {
    if(window.innerWidth > 800) {
      setExpanded('controlPanel');
    }
  }, []);

  const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  if (!AXIS_GROUPS) return null;
  return (
    <ExpansionPanel expanded={expanded === 'controlPanel'} onChange={handleChange('controlPanel')}>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="controlPanelbh-content"
        id="controlPanelbh-header"
      >
        <Typography className={classes.heading} >Axis Controls, etc.</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
          <Grid container className={classes.root} justify="space-between">
            <Grid container className={classes.elementContainer} direction="column" justify="space-between">
              <Axis type="Categorical" stateKey="colorCategory" selectedValue={initialState.colorCategory} axisLabel={'Color'}/>
            </Grid>
            <Grid container className={classes.elementContainer} direction="column" justify="space-between">
              <Axis type="Numeric" stateKey="xAxis" selectedValue={initialState.xAxis} axisLabel={'X Axis'}/>
              <Axis type="Numeric" stateKey="yAxis" selectedValue={initialState.yAxis} axisLabel={'Y Axis'}/>
            </Grid>
            <Grid container className={classes.elementContainer} direction="column" justify="space-between">
              <TimelineSlider publicationDates={props.publicationDates}/>
            </Grid>
          </Grid>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );

}

const mapStateToProps = (state: any, props: any) => ({
  ...state,
  ...props
});

export default connect(mapStateToProps)(ControlPanel);
 