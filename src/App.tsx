import React from 'react';
import logo from './logo.svg';
import './App.css';
import PlanetChart from './PlanetChart';
import { ChartOptions } from 'highcharts';

import confiredExoplanets from './confirmed-explanets.json';
import { Planet } from './Planet.interface';
import { AXIS_OPTIONS } from './App.constants';

export class App extends React.Component {

  planets: Planet[] = [];

  axisProps = {
    x: AXIS_OPTIONS[0],
    y: AXIS_OPTIONS[1]
  };
  initialChartOptions: Highcharts.Options = {
    chart: {
      type: 'scatter'
    },
    title: {
        text: `${this.axisProps.x.label} vs ${this.axisProps.y.label}`,
        style: {
          color: 'var(--text-color)'
        }
    },
    subtitle: {
        text: '<a href="https://exoplanetarchive.ipac.caltech.edu/" target="_blank">exoplanetarchive.ipac.caltech.edu</a>',
        useHTML: true
    },
    plotOptions: {
        scatter: {
            marker: {
                radius: 2,
                states: {
                    hover: {
                        enabled: true,
                        lineColor: 'rgb(100,100,100)'
                    }
                }
            },
            tooltip: {
                headerFormat: '<b>{series.name}</b><br>',
                pointFormat: `{point.x} ${this.axisProps.x.units}, {point.y} ${this.axisProps.y.units}`
            }
        }
    }
  };


  constructor(props: any) {
    super(props);
    this.planets = [...confiredExoplanets];
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          Planet Mapper
        </header>
        <PlanetChart chartOptions={this.initialChartOptions} planets={this.planets} axisProps={this.axisProps}/>
      </div>
    );
  }
}

export default App;
