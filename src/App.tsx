import { Box, createStyles, CssBaseline, Grid, makeStyles, MuiThemeProvider, Switch, Theme, withTheme } from '@material-ui/core';
import Brightness3RoundedIcon from '@material-ui/icons/Brightness3Rounded';
import WbSunnyRoundedIcon from '@material-ui/icons/WbSunnyRounded';
import React, { useEffect, useReducer } from 'react';
import { connect } from 'react-redux';
import { AppActionTypes } from './App.actions';
import { AppState } from './App.interface';
import { appReducer, initialAppState } from './App.reducer';
import ControlPanel from './ControlPanel';
import { ControlPanelState } from './ControlPanel.interface';
import { Planet } from './Planet.interface';
import { fetchPlanets, getDistinctPublicationDate } from './Planet.service';
import PlanetChart from './PlanetChart';
import { ThemeActionTypes } from './Theme.actions';
import { ThemeState } from './Theme.interface';
import { initialState as initialThemeState, themeReducer } from './Theme.reducer';
import { getThemeByName } from './themes/base';
import { TimelineSliderState } from './TimelineSlider.interface';


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
interface ConnectedAppProps {
  app: AppState,
  theme: ThemeState,
  controlPanel: ControlPanelState,
  timelineSlider: TimelineSliderState
}

const App:React.FC<ConnectedAppProps> = (props) => {

  // console.log('App props: ', props);

  const classes = useStyles();

  const [themeState, themeDispatch] = useReducer(themeReducer, initialThemeState);
  const theme = getThemeByName(themeState.appTheme);
  const [app, appDispatch] = useReducer(appReducer, initialAppState);

  useEffect(() => {
    fetchPlanets().then((planets: Planet[]) => {
      appDispatch({type: AppActionTypes.setPlanets, value: [...planets]});
      const publicationDates = getDistinctPublicationDate(planets);
      appDispatch({type: AppActionTypes.setPublicationDates, value: [...publicationDates]});
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
          <Box className={classes.boxItem}>
            <ControlPanel publicationDates={app.publicationDates}/>
          </Box>
          <Box className={classes.boxItem} flexGrow={1}>
            {app.planets.length && <PlanetChart planets={app.planets} theme={theme} />}
          </Box>
      </Box>
      </Grid>
    </MuiThemeProvider>
  );
}

const mapStateToProps = (state: any, props: any) => ({
  ...state,
  ...props
});

export default withTheme(connect(mapStateToProps)(App));
