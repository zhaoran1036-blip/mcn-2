
import React from 'react';
import {
  Radar, RadarChart, PolarGrid, 
  PolarAngleAxis, ResponsiveContainer
} from 'recharts';

interface Props {
  data: {
    reach: number;
    engagement: number;
    roi: number;
    consistency: number;
    cooperation: number;
  };
}

const CreatorRadarChart: React.FC<Props> = ({ data }) => {
  const chartData = [
    { subject: 'Reach', A: data.reach },
    { subject: 'Engagement', A: data.engagement },
    { subject: 'ROI', A: data.roi },
    { subject: 'Consistency', A: data.consistency },
    { subject: 'Collab', A: data.cooperation },
  ];

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
          <PolarGrid stroke="#e5e7eb" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: '#6b7280', fontSize: 12 }} />
          <Radar
            name="Performance"
            dataKey="A"
            stroke="#4f46e5"
            fill="#4f46e5"
            fillOpacity={0.5}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CreatorRadarChart;
