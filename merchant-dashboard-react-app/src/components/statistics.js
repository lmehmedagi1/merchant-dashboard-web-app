import React from 'react';
import { Input } from 'antd';
import { Chart, Axis, Tooltip, Geom } from 'bizcharts';
  
const data = [
    {
      x: '2017-09-01',
      y: 100,
    },
    {
      x: '2017-09-02',
      y: 120,
    },
    {
      x: '2017-09-03',
      y: 88,
    },
    {
      x: '2017-09-04',
      y: 65,
    },
  ];

const Statistics = () => {
    return (
        <div>
        <div id="naslovNotifikacije">
            <h1>Statistics</h1>
        </div>
        <div id="container">
        <Chart height={400} data={data} forceFit>
  <Axis name="month" />
  <Axis name="temperature" label={{ formatter: val => `${val}°C` }} />
  <Tooltip crosshairs={{ type : "y" }} />
  <Geom type="line" position="month*temperature" size={2} color={'city'} />
  <Geom type='point' position="month*temperature" size={4} color={'city'} />
</Chart>
        </div>
        </div>
    );
};

        
export default Statistics;