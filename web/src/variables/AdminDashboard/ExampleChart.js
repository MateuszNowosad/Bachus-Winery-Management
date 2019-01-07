import React from 'react';
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer';
import LineChart from 'recharts/lib/chart/LineChart';
import Line from 'recharts/lib/cartesian/Line';
import XAxis from 'recharts/lib/cartesian/XAxis';
import YAxis from 'recharts/lib/cartesian/YAxis';
import CartesianGrid from 'recharts/lib/cartesian/CartesianGrid';
import Tooltip from 'recharts/lib/component/Tooltip';
import Legend from 'recharts/lib/component/Legend';

const data = [
  //temp
  { name: 'Pon', vl1: 2200, vl2: 3400 },
  { name: 'Wto', vl1: 1280, vl2: 2398 },
  { name: 'Śro', vl1: 5000, vl2: 4300 },
  { name: 'Czw', vl1: 4780, vl2: 2908 },
  { name: 'Pią', vl1: 5890, vl2: 4800 },
  { name: 'Sob', vl1: 4390, vl2: 3800 },
  { name: 'Nie', vl1: 4490, vl2: 4300 }
];

function ExampleChart() {
  return (
    // 99% per https://github.com/recharts/recharts/issues/172
    <ResponsiveContainer width="99%" height={320}>
      <LineChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Line type="monotone" name="Prognoza zamówień" dataKey="vl1" stroke="#82ca9d" />
        <Line type="monotone" name="Zamówienia" dataKey="vl2" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default ExampleChart;
