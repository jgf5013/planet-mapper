import React from 'react';

import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import { Planet } from './Planet.interface';
import { AxisOption } from './AxisOption.interface';
import { withTheme, Theme } from '@material-ui/core';

interface PlanetProps {
  theme: Theme,
  planets: Planet [],
  axisProps: {
    x: AxisOption, y: AxisOption
  }
};

export class PlanetChart extends React.Component<PlanetProps> {
  internalChart: Highcharts.Chart | any;

  chartOptions: Highcharts.Options = {}

  constructor(props: PlanetProps) {
    super(props);
    this.chartOptions = {
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
        text: `${props.axisProps.x.label} vs ${props.axisProps.y.label}`,
        style: {
          color: props.theme.palette.primary.contrastText
        },
        margin: 25
      },
      subtitle: {
        text: `<a style="color: ${props.theme.palette.primary.contrastText}; margin: 20px;" href="https://exoplanetarchive.ipac.caltech.edu/" target="_blank">exoplanetarchive.ipac.caltech.edu</a>`,
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
            pointFormat: `{point.x} ${props.axisProps.x.units}, {point.y} ${props.axisProps.y.units}`
          }
        }
      }
    };
    this.afterChartCreated = this.afterChartCreated.bind(this);
  }

  componentDidMount() {
    this.internalChart.addSeries({
      type: 'scatter',
      name: 'Confirmed Planets',
      data: this.props.planets.map((p) => {
        const x: number = Number(p[this.props.axisProps.x.attribute]);
        const y: number = Number(p[this.props.axisProps.y.attribute]);
        return [x, y];
      })
    });
  }

  afterChartCreated(chart: Highcharts.Chart) {
    this.internalChart = chart;
  }
  
  render() {
      return (
        <div className="PlanetChart">
          <HighchartsReact
            highcharts={Highcharts}
            options={this.chartOptions}
            callback={ this.afterChartCreated }/>
        </div>
    );
  }

}

export default withTheme(PlanetChart);

 
 