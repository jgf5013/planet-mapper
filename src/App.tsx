import React, { useState, useContext, useReducer } from 'react';
import PlanetChart from './PlanetChart';

import confiredExoplanets from './confirmed-explanets.json';
import { Planet } from './Planet.interface';
import { AXIS_OPTIONS } from './App.constants';
import { ControlPanel } from './ControlPanel';
import { makeStyles, createStyles, Theme, Grid, withTheme, Paper, Button, MuiThemeProvider, CssBaseline } from '@material-ui/core';
import { AppStateContext } from './StateProvider';
import WbSunnyRoundedIcon from '@material-ui/icons/WbSunnyRounded';
import Brightness3RoundedIcon from '@material-ui/icons/Brightness3Rounded';
import { AppState } from './App.interface';
import { appReducer, initialState } from './App.reducer';
import { AppActionTypes } from './App.actions';
import { getThemeByName } from './themes/base';

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
  const globalState = useContext<AppState>(AppStateContext);
  const [state, dispatch] = useReducer(appReducer, initialState);
  const theme = getThemeByName(state.appTheme);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Grid className={classes.root} container direction="column">
        <Grid item xs={12}>
          <Grid container className={classes.header} justify="space-between">
            <Brightness3RoundedIcon color="primary" aria-label="Dark Theme"
              onClick={() => dispatch({type: AppActionTypes.toggleTheme})}/>
            Planet Mapper
            <WbSunnyRoundedIcon color="secondary" aria-label="Light Theme"
              onClick={() => dispatch({type: AppActionTypes.toggleTheme})}/>
          </Grid>
        </Grid>
        <Grid item xs={12} className={classes.appWrapper}>
            <ControlPanel />
            <PlanetChart planets={confiredExoplanets} axisProps={axisProps} theme={theme} />
        </Grid>
      </Grid>
    </MuiThemeProvider>
  );
}

export default withTheme(App);
