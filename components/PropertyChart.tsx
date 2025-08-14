
import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import type { PredictedProperties } from '../types';

interface PropertyChartProps {
    data: PredictedProperties;
}

const ChartTooltip: React.FC<any> = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-700 p-2 border border-slate-600 rounded-md shadow-lg">
          <p className="label text-sm text-slate-200">{`${label} : ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
};

export const PropertyChart: React.FC<PropertyChartProps> = ({ data }) => {
    const chartData = [
        { subject: 'Binding Affinity', A: data.bindingAffinity, fullMark: 100 },
        { subject: 'Solubility', A: data.solubility, fullMark: 100 },
        { subject: 'Bioavailability', A: data.bioavailability, fullMark: 100 },
        { subject: 'Low Toxicity', A: 100 - data.toxicity, fullMark: 100 }, // Inverting toxicity for better visualization
        { subject: 'Synth. Access', A: data.syntheticAccessibility, fullMark: 100 },
    ];

    return (
        <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                <defs>
                    <radialGradient id="colorA">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1}/>
                    </radialGradient>
                </defs>
                <PolarGrid stroke="#475569" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: 'transparent' }}/>
                <Radar name="Molecule Score" dataKey="A" stroke="#818cf8" fill="url(#colorA)" fillOpacity={0.7} />
                <Tooltip content={<ChartTooltip />} />
                <Legend iconType="circle" wrapperStyle={{color: '#e2e8f0'}}/>
            </RadarChart>
        </ResponsiveContainer>
    );
};