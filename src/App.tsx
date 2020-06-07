import React, { useState, useContext, useReducer, useEffect } from 'react';
import PlanetChart from './PlanetChart';

import { Planet } from './Planet.interface';
import { AXIS_GROUPS } from './App.constants';
import { ControlPanel } from './ControlPanel';
import { makeStyles, createStyles, Theme, Grid, withTheme, Paper, Button, MuiThemeProvider, CssBaseline, Switch, Fab, Box, Slider } from '@material-ui/core';
import { AppStateContext } from './StateProvider';
import WbSunnyRoundedIcon from '@material-ui/icons/WbSunnyRounded';
import Brightness3RoundedIcon from '@material-ui/icons/Brightness3Rounded';
import { ThemeState } from './Theme.interface';
import { themeReducer, initialState as initialThemeState } from './Theme.reducer';
import { ThemeActionTypes } from './Theme.actions';
import { getThemeByName } from './themes/base';
// import { appReducer, initialState } from './App.reducer';
import { controlPanelReducer, initialState as initialControlPanelState } from './ControlPanel.reducer';
import TimelineSlider from './TimelineSlider';
import { getPublicationDateRange, fetchPlanets, getDistinctPublicationDate } from './Planet.service';

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
    headerName: {
      padding: '1vh'
    },
    appWrapper: {
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: 'column',
      [theme.breakpoints.up('md')]: {
        flexDirection: 'row-reverse'
      }
    },
    boxItem: {
      margin: '2vw'
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
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [publicationDates, setPublicationDates] = useState<string[]|null>();

  useEffect(() => {
    fetchPlanets().then((planets: Planet[]) => {
      setPlanets(planets);
      const publicationDates = getDistinctPublicationDate(planets);
      setPublicationDates(publicationDates);
    });
  }, []);
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Grid className={classes.root} container direction="column">
      <Grid item xs={12}>
        <Grid container className={classes.header} justify="space-between">
          {/* <Grid>just a spacer</Grid> */}
          <Grid className={classes.headerName} item xs={6}>
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
      <Box className={classes.appWrapper}>
          <Box className={classes.boxItem}><ControlPanel /></Box>
          <Box className={classes.boxItem} flexGrow={1}>
            {planets.length && <PlanetChart planets={planets} theme={theme} />}
            <TimelineSlider publicationDates={publicationDates} />
          </Box>
      </Box>
      </Grid>
    </MuiThemeProvider>
  );
}

export default withTheme(App);
