import React from 'react';

import { makeStyles, createStyles, Theme, ListSubheader, ListItem, Grid } from '@material-ui/core';
import { AXIS_GROUPS } from './App.constants';
import Axis from './Axis';
import { initialState } from './ControlPanel.reducer';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
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



export function ControlPanel() {


  const classes = useStyles();
  if (!AXIS_GROUPS) return null;
  return (
    <Grid container className={classes.root} justify="space-between">
      <Axis stateKey="xAxis" selectedValue={initialState.xAxis} axisLabel={'X Axis'}/>
      <Axis stateKey="yAxis" selectedValue={initialState.yAxis} axisLabel={'Y Axis'}/>
    </Grid>
  );


}
 