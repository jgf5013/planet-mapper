import React from 'react';


import { makeStyles, createStyles, Theme, ListSubheader, ListItem, Grid } from '@material-ui/core';
import { AXIS_OPTIONS } from './App.constants';
import { Axis } from './Axis';


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

const initialState = {
  xAxis: AXIS_OPTIONS[0].axes[0].attribute,
  yAxis: AXIS_OPTIONS[1].axes[0].attribute
}


export function ControlPanel() {


  const classes = useStyles();
  if (!AXIS_OPTIONS) return null;
  return (
    <Grid container className={classes.root} justify="space-between">
      <Axis axis={initialState.xAxis} axisLabel={'X Axis'}/>
      <Axis axis={initialState.yAxis} axisLabel={'Y Axis'}/>
    </Grid>
  );


}
 