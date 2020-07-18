import { Theme } from '@material-ui/core';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import moment from 'moment';

import HC_more from 'highcharts/highcharts-more' //module
import React from 'react';
import { connect } from 'react-redux';
import { getCategoriesWithCounts, getLabelFromKey } from './Axis.service';
import { AxisOption } from './AxisOption.interface';
import { ControlPanelState } from './ControlPanel.interface';
import { Planet } from './Planet.interface';
import { TimelineSliderState } from './TimelineSlider.interface';


HC_more(Highcharts) //init module

interface PlanetProps {
  theme: Theme,
  planets: Planet [],
  axisProps: {
    x: AxisOption, y: AxisOption
  },
  controlPanel: ControlPanelState,
  timelineSlider: TimelineSliderState
};

export class PlanetChart extends React.Component<PlanetProps> {
  internalChart: Highcharts.Chart | any;

  chartOptions: Highcharts.Options = {}

  
  render() {
    const xAxis: AxisOption = getLabelFromKey(this.props.controlPanel.xAxis);
    const yAxis: AxisOption = getLabelFromKey(this.props.controlPanel.yAxis);
    const selectedColorCategory: string = this.props.controlPanel.colorCategory;
    const filterMappedPlanets: any[] = this.props.planets
      .filter(p => p[xAxis.attribute] && p[yAxis.attribute] && typeof p.pl_publ_date !== 'undefined' && p['pl_publ_date']) //filters out null values
      .map((p) => {
        const name: string = p['pl_name'];
        const x: any = isNaN(p[xAxis.attribute]) ? new Date(p[xAxis.attribute]) : Number(p[xAxis.attribute]);
        const y: any = isNaN(p[yAxis.attribute]) ? new Date(p[yAxis.attribute]) : Number(p[yAxis.attribute]);

        const z: number = Number(p['pl_radj'])
        const t: Date = p['pl_publ_date'] ? new Date(p['pl_publ_date']) : new Date();
        const colorCategory: string = p[selectedColorCategory]
        return {name, x, y, z, t, colorCategory};
      })
    const dateFilterFunction: Function = (date: Date, p: any) => {
      return p.t <= date
    };
    const comparisonDate: Date = moment().add(this.props.timelineSlider.dateOffSet, 'years').toDate();
    const colorCategoriesWithCounts: any[] = getCategoriesWithCounts(filterMappedPlanets, 'colorCategory', comparisonDate, dateFilterFunction);
    let mappedColorCategoryCounts = {};
    colorCategoriesWithCounts.forEach((cc) => { mappedColorCategoryCounts[cc.key] = cc.dateCount });
    this.chartOptions = {
      chart: {
        type: 'bubble',
        zoomType: 'xy',
        backgroundColor: this.props.theme.palette.background.default
      },
      title: undefined,
      legend: {
        itemStyle: {
          color: this.props.theme.palette.text.primary
        },
        maxHeight: 100,
        align: 'center',
        verticalAlign: 'bottom',
      },
      xAxis: {
        type: xAxis.type === 'Date' ? 'datetime' : 'linear',
        min: Math.min(...filterMappedPlanets.map(p => p.x)),
        max: Math.max(...filterMappedPlanets.map(p => p.x)),
        title: {
          text: `${xAxis.label}${xAxis.units ? ' [' + xAxis.units + ']' : ''}`
        }
      },
      yAxis: {
        type: yAxis.type === 'Date' ? 'datetime' : 'linear',
        min: Math.min(...filterMappedPlanets.map(p => p.y)),
        max: Math.max(...filterMappedPlanets.map(p => p.y)),
        title: {
          text: `${yAxis.label}${yAxis.units ? ' [' + yAxis.units + ']' : ''}`
        }
      },
      tooltip: {
          useHTML: true,
          headerFormat: '<table>',
          pointFormat: `
              <tr><th colspan="2"><h3>{point.name}</h3></th></tr>
              <tr><th>${xAxis.label}</th><td>{point.x}${xAxis.units ? ' [' + xAxis.units + ']' : ''}</td></tr>
              <tr><th>${yAxis.label}</th><td>{point.y}${yAxis.units ? ' [' + yAxis.units + ']' : ''}</td></tr>
              <tr><th>Radius</th><td>{point.z} Jupiter Masses</td></tr>`,
          footerFormat: '</table>',
          followPointer: false
      },
      plotOptions: {
        bubble: {
          minSize: '1%',
          maxSize: '10%'
        }
      },
      series: Object.keys(mappedColorCategoryCounts).map((colorCategory) => {
        const visiblePlanetsForColor = filterMappedPlanets
          .filter(p => {
            return (p.colorCategory === colorCategory && dateFilterFunction(comparisonDate, p))
          });
        return {
          type: 'bubble',
          name: `${colorCategory} (${mappedColorCategoryCounts[colorCategory]})`,
          data: visiblePlanetsForColor,
          marker: {
            enabled: mappedColorCategoryCounts[colorCategory] > 0
          }
        };
      })
    };
    return (
      <div>
        <HighchartsReact
          highcharts={Highcharts}
          options={this.chartOptions}/>
      </div>
    );
  }

}

 
 
const mapStateToProps = (state: any, props: any) => ({
  ...state,
  ...props
});



export default connect(mapStateToProps)(PlanetChart)