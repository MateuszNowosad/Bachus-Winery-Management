import React from 'react';
import { Radar, RadarChart, PolarGrid, Legend, PolarAngleAxis, PolarRadiusAxis } from 'recharts';

const data = [
  { subject: 'Butelki', A: 36 },
  { subject: 'Korki', A: 72 },
  { subject: 'Wino', A: 99 },
  { subject: 'Etykiety', A: 32 }
];

const style = {
  top: 120,
  left: 500,
  lineHeight: '24px'
};

export function TwoLevelPieChart() {
  return (
    <RadarChart cx={300} cy={250} outerRadius={150} width={600} height={500} data={data}>
      <PolarGrid />
      <PolarAngleAxis dataKey="subject" />
      <PolarRadiusAxis angle={0} domain={[0, 100]} />
      <Radar name="Dostępność towaru w magazynach [%]" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
      <Legend iconSize={10} width={220} height={140} layout="vertical" verticalAlign="middle" wrapperStyle={style} />
    </RadarChart>
  );
}
