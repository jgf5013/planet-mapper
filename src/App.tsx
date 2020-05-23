import React, { useState, useContext, useReducer } from 'react';
import PlanetChart from './PlanetChart';

import confiredExoplanets from './confirmed-explanets.json';
import { Planet } from './Planet.interface';
import { AXIS_GROUPS } from './App.constants';
import { ControlPanel } from './ControlPanel';
import { makeStyles, createStyles, Theme, Grid, withTheme, Paper, Button, MuiThemeProvider, CssBaseline, Switch, Fab } from '@material-ui/core';
import { AppStateContext } from './StateProvider';
import WbSunnyRoundedIcon from '@material-ui/icons/WbSunnyRounded';
import Brightness3RoundedIcon from '@material-ui/icons/Brightness3Rounded';
import { ThemeState } from './Theme.interface';
import { themeReducer, initialState as initialThemeState } from './Theme.reducer';
import { ThemeActionTypes } from './Theme.actions';
import { getThemeByName } from './themes/base';
// import { appReducer, initialState } from './App.reducer';
import { controlPanelReducer, initialState as initialControlPanelState } from './ControlPanel.reducer';

const lightTheme = getThemeByName('lightTheme');
const darkTheme = getThemeByName('darkTheme');

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
      }
    },
    darkIcon: {
      backgroundColor: darkTheme.palette.background.default,
      borderRadius: '0.75rem',
      padding: '5px'
    },
    lightIcon: {
      backgroundColor: lightTheme.palette.background.default,
      borderRadius: '0.75rem',
      padding: '5px'
    }
  }),
);


export function App(props: { theme: Theme }) {

  const classes = useStyles();

  // const [state, dispatch] = useReducer(appReducer, initialState);
  const [themeState, themeDispatch] = useReducer(themeReducer, initialThemeState);
  const theme = getThemeByName(themeState.appTheme);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Grid className={classes.root} container direction="column">
      <Grid item xs={12}>
        <Grid container className={classes.header} justify="space-between">
          <Grid item xs={6}>
            Planet Mapper
          </Grid>
          <Grid>
            <Switch
              checked={themeState.themeChecked}
              onChange={() => themeDispatch({type: ThemeActionTypes.toggleTheme})}
              icon={<Brightness3RoundedIcon aria-label="Dark Theme" className={classes.lightIcon} />}
              checkedIcon={<WbSunnyRoundedIcon color="secondary" aria-label="Light Theme" className={classes.darkIcon} />}
              color="primary"
              name="themeCheck"
              inputProps={{ 'aria-label': 'light and dark theme checkbox' }} />
            </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} className={classes.appWrapper}>
          <ControlPanel />
          <PlanetChart planets={confiredExoplanets} theme={theme} />
      </Grid>
      </Grid>
    </MuiThemeProvider>
  );
}

export default withTheme(App);
