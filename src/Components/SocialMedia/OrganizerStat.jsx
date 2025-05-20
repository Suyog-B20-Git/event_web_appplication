
/* eslint-disable react/prop-types */
import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#FF0000", "#1DA1F2"];

const OrganizerStats = ({ data }) => {

  const hasYoutubeData = data.youtubeStats && data.youtubeStats.subscribers;
  const hasTwitterData = data.twitterStats && data.twitterStats.followers;

  if (!hasYoutubeData && !hasTwitterData) {
    return <div className="h-44 lg:text-lg flex justify-center">No Stat Data</div>;
  }

  let chartData = [];

  if (hasYoutubeData) {
    chartData.push({ name: "YouTube Subscribers", platform: "YouTube", type: "Subscribers", value: data.youtubeStats.subscribers });
  }
  if (hasTwitterData) {
    chartData.push({ name: "Twitter Followers", platform: "Twitter", type: "Followers", value: data.twitterStats.followers });
  }

  const total = chartData.reduce((sum, entry) => sum + entry.value, 0);

  return (
    <div className="max-w-4xl mx-auto bg-white">
      <h2 className="text-xl font-semibold text-center">Subscriber & Follower Stats (%)</h2>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius="30%"
            outerRadius="70%"
            fill="#8884d8"
            dataKey="value"
            label={({ cx, cy, midAngle, outerRadius, percent, index }) => {
              const RADIAN = Math.PI / 180;
              const x = cx + (outerRadius + 20) * Math.cos(-midAngle * RADIAN);
              const y = cy + (outerRadius + 40) * Math.sin(-midAngle * RADIAN);

              return (
                <text
                  x={x}
                  y={y}
                  fill={COLORS[index % COLORS.length]}
                  textAnchor={x > cx ? "start" : "end"}
                  dominantBaseline="central"
                  fontSize="12px"
                  fontWeight="bold"
                >
                  <tspan x={x} dy="-1em">{chartData[index].platform}</tspan>
                  <tspan x={x} dy="1.2em">{chartData[index].type}</tspan>
                  <tspan x={x} dy="1.2em">{(percent * 100).toFixed(1)}%</tspan>
                </text>
              );
            }}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `${((value / total) * 100).toFixed(1)}%`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default OrganizerStats;
