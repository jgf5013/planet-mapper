import React, { useContext } from 'react';

import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import { Planet } from './Planet.interface';
import { AxisOption } from './AxisOption.interface';
import { Theme } from '@material-ui/core';
import { ControlPanelState } from './ControlPanel.interface';
import { connect } from 'react-redux';
import { getLabelFromKey } from './Axis.service';

interface PlanetProps {
  theme: Theme,
  planets: Planet [],
  axisProps: {
    x: AxisOption, y: AxisOption
  },
  controlPanel: ControlPanelState
};

export class PlanetChart extends React.Component<PlanetProps> {
  internalChart: Highcharts.Chart | any;

  chartOptions: Highcharts.Options = {}

  constructor(props: PlanetProps) {
    super(props);

  }
  
  render() {
    console.log('theme: ', this.props.theme);
    const xAxis: AxisOption = getLabelFromKey(this.props.controlPanel.xAxis);
    const yAxis: AxisOption = getLabelFromKey(this.props.controlPanel.yAxis);
    this.chartOptions = {
      chart: {
        type: 'scatter',
        backgroundColor: this.props.theme.palette.background.default
      },
      legend: {
        itemStyle: {
          color: this.props.theme.palette.text.primary
        }
      },
      title: {
        text: `${xAxis.label} vs ${yAxis.label}`,
        style: {
          color: this.props.theme.palette.text.primary
        },
        margin: 25
      },
      subtitle: {
        text: `<a style="color: ${this.props.theme.palette.text.primary}; margin: 20px;" href="https://exoplanetarchive.ipac.caltech.edu/" target="_blank">exoplanetarchive.ipac.caltech.edu</a>`,
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
            pointFormat: `{point.x} ${xAxis.units}, {point.y} ${yAxis.units}`
          }
        }
      },
      series: [{
        type: 'scatter',
        name: 'Confirmed Planets',
        data: this.props.planets
          .filter(p => p[xAxis.attribute] && p[yAxis.attribute]) //filters out null values
          .map((p) => {
          const x: number = Number(p[xAxis.attribute]);
          const y: number = Number(p[yAxis.attribute]);
          return [x, y];
        })
      }]
    };
    console.log('PlanetChart - props: ', this.props);
    return (
      <div>
        <HighchartsReact
          highcharts={Highcharts}
          options={this.chartOptions}/>
      </div>
    );
  }

}

 
 
const mapStateToProps = (state: ControlPanelState, props: any) => ({
  ...state,
  ...props
});



export default connect(mapStateToProps)(PlanetChart)