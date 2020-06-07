import React, { useContext } from 'react';

import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

// import './PlanetChart.css';

import { Planet } from './Planet.interface';
import { AxisOption } from './AxisOption.interface';
import { Theme, createStyles, makeStyles } from '@material-ui/core';
import { ControlPanelState } from './ControlPanel.interface';
import { connect } from 'react-redux';
import { getLabelFromKey, getCategories, getCategoriesWithCounts } from './Axis.service';
import { TimelineSliderState } from './TimelineSlider.interface';


// const useStyles = makeStyles((theme: Theme) =>
//     createStyles({
//       highchartsLegend: {
//         minHeight: 100
//       }
//     })
// )

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

  constructor(props: PlanetProps) {
    super(props);

  }
  
  render() {
    const xAxis: AxisOption = getLabelFromKey(this.props.controlPanel.xAxis);
    const yAxis: AxisOption = getLabelFromKey(this.props.controlPanel.yAxis);
    const selectedColorCategory: string = this.props.controlPanel.colorCategory;
    const filterMappedPlanets: any[] = this.props.planets
      .filter(p => p[xAxis.attribute] && p[yAxis.attribute] && typeof p.pl_publ_date !== 'undefined' && p['pl_publ_date']) //filters out null values
      .map((p) => {
        const x: number = Number(p[xAxis.attribute]);
        const y: number = Number(p[yAxis.attribute]);
        const t: Date = p['pl_publ_date'] ? new Date(p['pl_publ_date']) : new Date();
        const colorCategory: string = p[selectedColorCategory]
        return {x, y, t, colorCategory};
      })
    // const visiblePlanetsForDate = filterMappedPlanets
    //   .filter(p => {
    //     return p.t <= this.props.timelineSlider.date;
    //   });
    // const colorCategories: any[] = getCategories(filterMappedPlanets, 'colorCategory');
    const filterFunction: Function = (date: Date, p: any) => { return p.t <= date };
    const comparisonDate: Date = this.props.timelineSlider.date;
    const colorCategoriesWithCounts: any[] = getCategoriesWithCounts(filterMappedPlanets, 'colorCategory', comparisonDate, filterFunction);
    let mappedColorCategoryCounts = {};
    colorCategoriesWithCounts.forEach((cc) => { mappedColorCategoryCounts[cc.key] = cc.count });
    this.chartOptions = {
      chart: {
        type: 'scatter',
        backgroundColor: this.props.theme.palette.background.default
      },
      legend: {
        itemStyle: {
          color: this.props.theme.palette.text.primary
        },
        maxHeight: 100,
        align: 'center',
        verticalAlign: 'bottom',
      },
      xAxis: {
        min: Math.min(...filterMappedPlanets.map(p => p.x)),
        max: Math.max(...filterMappedPlanets.map(p => p.x))
      },
      yAxis: {
        min: Math.min(...filterMappedPlanets.map(p => p.y)),
        max: Math.max(...filterMappedPlanets.map(p => p.y))
      },
      // title: {
      //   text: `${xAxis.label} vs ${yAxis.label}`,
      //   style: {
      //     color: this.props.theme.palette.text.primary
      //   },
      //   margin: 25
      // },
      // subtitle: {
      //   text: `<a style="color: ${this.props.theme.palette.text.primary}; margin: 20px;" href="https://exoplanetarchive.ipac.caltech.edu/" target="_blank">exoplanetarchive.ipac.caltech.edu</a>`,
      //   useHTML: true,
      // },
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
      series: Object.keys(mappedColorCategoryCounts).map((colorCategory) => {
        const visiblePlanetsForColor = filterMappedPlanets.filter(p => p.colorCategory === colorCategory);
        return {
          type: 'scatter',
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