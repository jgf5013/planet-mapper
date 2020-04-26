import React, { useRef, useState, useEffect } from 'react';
import Chartjs from 'chart.js';

const chartConfig = {
  type: 'bar',
  data: {
  },
  options: {
  }
};

const updateDataset = (datasetIndex: any, newData: any) => {
  // chartInstance.data.datasets[datasetIndex].data = newData;
  // chartInstance.update();
};

const onButtonClick = () => {
  const data = [1, 2, 3, 4, 5, 6];
  updateDataset(0, data);
};


export function PlanetGraph() {
  const chartContainer = useRef('test');
  const [chartInstance, setChartInstance] = useState();

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      const newChartInstance = new Chartjs(chartContainer.current, chartConfig);
      setChartInstance(newChartInstance);
    }
  }, [chartContainer]);

  return (
    <div>
      {/* <canvas ref={chartContainer} /> */}
    </div>
  );
};