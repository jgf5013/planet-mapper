import React from 'react';

import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import './PlanetChart.css';

import { render } from '@testing-library/react';
import { Planet } from './Planet.interface';
import { AxisOption } from './AxisOption.interface';

interface PlanetProps {
  chartOptions: Highcharts.Options,
  planets: Planet [],
  axisProps: {
    x: AxisOption, y: AxisOption
  }
};

export class PlanetChart extends React.Component<PlanetProps> {
  internalChart: Highcharts.Chart | any;

  constructor(props: PlanetProps) {
    super(props);
    this.afterChartCreated = this.afterChartCreated.bind(this);
  }

  componentDidMount() {
    this.internalChart.addSeries({
      type: 'scatter',
      name: 'Confirmed Planets',
      color: 'var(--text-color)',
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
      return (<div className="PlanetChart">
          <HighchartsReact
            highcharts={Highcharts}
            options={this.props.chartOptions}
            callback={ this.afterChartCreated }/>
      </div>
    );
  }

}

export default PlanetChart;

 
 