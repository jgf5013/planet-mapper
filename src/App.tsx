import React from 'react';
import PlanetChart from './PlanetChart';

import confiredExoplanets from './confirmed-explanets.json';
import { Planet } from './Planet.interface';
import { AXIS_OPTIONS } from './App.constants';
import ControlPanel from './ControlPanel';
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
    x: AXIS_OPTIONS[0],
    y: AXIS_OPTIONS[1]
  };
  const initialChartOptions: Highcharts.Options = {
    chart: {
      type: 'scatter',
      backgroundColor: props.theme.palette.background.default
    },
    legend: {
      itemStyle: {
        color: props.theme.palette.primary.contrastText
      }
    },
    title: {
      text: `${axisProps.x.label} vs ${axisProps.y.label}`,
      style: {
        color: props.theme.palette.primary.contrastText
      }
    },
    subtitle: {
      text: `<a style="color: ${props.theme.palette.primary.contrastText}" href="https://exoplanetarchive.ipac.caltech.edu/" target="_blank">exoplanetarchive.ipac.caltech.edu</a>`,
      useHTML: true,
    },
    plotOptions: {
      scatter: {
        marker: {
          radius: 2,
          states: {
            hover: {
              enabled: true,
            }
          }
        },
        tooltip: {
          headerFormat: '<b>{series.name}</b><br>',
          pointFormat: `{point.x} ${axisProps.x.units}, {point.y} ${axisProps.y.units}`
        }
      }
    }
  };


  return (
    <Grid className={classes.root} container direction="column">
      <Grid item xs={12}>
        <Grid container className={classes.header} justify="center">
          Planet Mapper
        </Grid>
      </Grid>
      <Grid item xs={12} className={classes.appWrapper}>
        <Grid>
          <ControlPanel />
        </Grid>
        <Grid>
          <PlanetChart chartOptions={initialChartOptions} planets={confiredExoplanets} axisProps={axisProps} />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default withTheme(App);
