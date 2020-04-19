import React from 'react';
import PlanetChart from './PlanetChart';

import confiredExoplanets from './confirmed-explanets.json';
import { Planet } from './Planet.interface';
import { AXIS_OPTIONS } from './App.constants';
import { ControlPanel } from './ControlPanel';
import { makeStyles, createStyles, Theme, Grid, withTheme, Paper } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      fontSize: 'calc(10px + 2vmin)'
    },
    header: {
      minHeight: '10vh'
    },
    appWrapper: {
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: 'column',
      [theme.breakpoints.up('md')]: {
        flexDirection: 'row-reverse'
      },
    }
  }),
);


export function App(props: { theme: Theme }) {

  const classes = useStyles();

  const axisProps = {
    x: AXIS_OPTIONS[0].axes[0],
    y: AXIS_OPTIONS[1].axes[0]
  };


  return (
    <Grid className={classes.root} container direction="column">
      <Grid item xs={12}>
        <Grid container className={classes.header} justify="center">
          Planet Mapper
        </Grid>
      </Grid>
      <Grid item xs={12} className={classes.appWrapper}>
        <Paper>
          <ControlPanel />
        </Paper>
        <Paper>
          <PlanetChart planets={confiredExoplanets} axisProps={axisProps} />
        </Paper>
      </Grid>
    </Grid>
  );
}

export default withTheme(App);
