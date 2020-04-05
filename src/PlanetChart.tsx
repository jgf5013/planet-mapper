import React from 'react';

import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import './PlanetChart.css';

import confiredExoplanets from './confirmed-explanets.json';
import { render } from '@testing-library/react';

interface PlanetProps {

}

export class PlanetChart extends React.Component<PlanetProps> {
  options: Highcharts.Options;
  internalChart: Highcharts.Chart | any;

  constructor(planetProps: PlanetProps) {
    super(planetProps);
    this.afterChartCreated = this.afterChartCreated.bind(this);
    this.options = {
      chart: {
        type: 'scatter'
      },
      title: {
          text: 'Height Versus Weight of 507 Individuals by Gender',
          style: {
            color: 'var(--text-color)'
          }
      },
      subtitle: {
          text: 'Source: Heinz  2003'
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
                  pointFormat: '{point.x} Jupiter Masses, {point.y} Light Years'
              }
          }
      }
    };
    // console.log('confiredExoplanets: ', confiredExoplanets);

    // const series = 
    // this.options.series[0].mapData = series;
    
  }

  componentDidMount() {
    this.internalChart.addSeries({
      type: 'scatter',
      name: 'Confirmed Planets',
      color: 'var(--text-color)',
      data: confiredExoplanets.map((p) => [p.pl_bmassj, p.st_dist])
    });
  }

  afterChartCreated(chart: Highcharts.Chart) {
    this.internalChart = chart;
  }
  
  

  //pl_bmassj & st_dist
  
  render() {
      return (<div className="PlanetChart">
          <HighchartsReact
            highcharts={Highcharts}
            options={this.options}
            callback={ this.afterChartCreated }/>
      </div>
    );
  }

}

export default PlanetChart;

 
 