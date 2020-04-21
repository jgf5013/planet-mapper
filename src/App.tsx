import React, { useState, useContext } from 'react';
import PlanetChart from './PlanetChart';

import confiredExoplanets from './confirmed-explanets.json';
import { Planet } from './Planet.interface';
import { AXIS_OPTIONS } from './App.constants';
import { ControlPanel } from './ControlPanel';
import { makeStyles, createStyles, Theme, Grid, withTheme, Paper, Button } from '@material-ui/core';
import { ThemeContext} from './ThemeProvider';
import WbSunnyRoundedIcon from '@material-ui/icons/WbSunnyRounded';
import Brightness3RoundedIcon from '@material-ui/icons/Brightness3Rounded';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      fontSize: 'calc(10px + 2vmin)',
      padding: '1rem'
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

  // State to hold the selected theme name
  const setThemeName = useContext(ThemeContext);


  return (
    <Grid className={classes.root} container direction="column">
      <Grid item xs={12}>
        <Grid container className={classes.header} justify="space-between">
          <Brightness3RoundedIcon color="primary" aria-label="Dark Theme"
            onClick={() => setThemeName("darkTheme")}/>
          Planet Mapper
          <WbSunnyRoundedIcon color="secondary" aria-label="Light Theme"
            onClick={() => setThemeName("lightTheme")}/>
        </Grid>
      </Grid>
      <Grid item xs={12} className={classes.appWrapper}>
          <ControlPanel />
          <PlanetChart planets={confiredExoplanets} axisProps={axisProps} />
      </Grid>
    </Grid>
  );
}

export default withTheme(App);
