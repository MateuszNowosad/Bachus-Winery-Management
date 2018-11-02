import React from 'react';
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer';
import LineChart from 'recharts/lib/chart/LineChart';
import Line from 'recharts/lib/cartesian/Line';
import XAxis from 'recharts/lib/cartesian/XAxis';
import YAxis from 'recharts/lib/cartesian/YAxis';
import CartesianGrid from 'recharts/lib/cartesian/CartesianGrid';
import Tooltip from 'recharts/lib/component/Tooltip';
import Legend from 'recharts/lib/component/Legend';

const data = [ //temp
    {name: "Pon", "Prognoza zamówień": 2200, "Zamówienia": 3400},
    {name: "Wto", "Prognoza zamówień": 1280, "Zamówienia": 2398},
    {name: "Śro", "Prognoza zamówień": 5000, "Zamówienia": 4300},
    {name: "Czw", "Prognoza zamówień": 4780, "Zamówienia": 2908},
    {name: "Pią", "Prognoza zamówień": 5890, "Zamówienia": 4800},
    {name: "Sob", "Prognoza zamówień": 4390, "Zamówienia": 3800},
    {name: "Nie", "Prognoza zamówień": 4490, "Zamówienia": 4300},
];

function ExampleChart() {
    return (
        // 99% per https://github.com/recharts/recharts/issues/172
        <ResponsiveContainer width="99%" height={320}>
            <LineChart data={data}>
                <XAxis dataKey="name"/>
                <YAxis/>
                <CartesianGrid vertical={false} strokeDasharray="3 3"/>
                <Tooltip/>
                <Legend/>
                <Line type="monotone" dataKey="Prognoza zamówień" stroke="#82ca9d"/>
                <Line type="monotone" dataKey="Zamówienia" stroke="#8884d8" activeDot={{r: 8}}/>
            </LineChart>
        </ResponsiveContainer>
    );
}

export default ExampleChart;