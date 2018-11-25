import React from 'react';
import Legend from 'recharts/lib/component/Legend';
import RadialBarChart from 'recharts/es6/chart/RadialBarChart';
import RadialBar from 'recharts/es6/polar/RadialBar';
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer';
import PolarAngleAxis from 'recharts/es6/polar/PolarAngleAxis';

const data = [
  { name: '18-24', uv: 31.47, fill: '#8884d8' },
  { name: '25-29', uv: 26.69, fill: '#83a6ed' },
  { name: '30-34', uv: 15.69, fill: '#8dd1e1' },
  { name: '35-39', uv: 8.22, fill: '#82ca9d' },
  { name: '40-49', uv: 8.63, fill: '#a4de6c' },
  { name: '50+', uv: 2.63, fill: '#d0ed57' },
  { name: 'unknow', uv: 50, fill: '#ffc658' }
];

const style = {
  top: 0,
  left: 350,
  lineHeight: '24px'
};

function SimpleRadialBarChart() {
  return (
    <ResponsiveContainer width="99%" height={320}>
      <RadialBarChart
        width={500}
        height={300}
        cx={150}
        cy={150}
        innerRadius={20}
        outerRadius={140}
        barSize={10}
        data={data}
      >
        <PolarAngleAxis type="number" domain={[0, 100]} dataKey={'value'} angleAxisId={0} tick={false} />
        <RadialBar
          minAngle={15}
          label={{ position: 'insideStart', fill: '#fff' }}
          background
          clockWise={true}
          dataKey="uv"
        />
        <Legend iconSize={10} width={120} height={140} layout="vertical" verticalAlign="middle" wrapperStyle={style} />
      </RadialBarChart>
    </ResponsiveContainer>
  );
}

export default SimpleRadialBarChart;
