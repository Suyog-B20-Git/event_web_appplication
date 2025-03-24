// /* eslint-disable react/prop-types */
// import React, { Component } from "react";

// // VenueStats component
// const VenueStats = ({ data }) => {
//   console.log("stat", data);

//   // Check if the necessary data exists for each section
//   const hasYoutubeData = data.youtubeData && data.youtubeStats;
//   const hasTwitterData = data.twitterData && data.twitterStats;

//   // If no data is available, show a "No Stat Data" message
//   if (!hasYoutubeData && !hasTwitterData) {
//     return (
//         <div className="h-44 lg:text-lg flex justify-center items-center">
//           No Stat Data
//         </div>
//     );
//   }

//   return (
//       <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl">
//         {/* YouTube Section */}
//         {hasYoutubeData && (
//             <ErrorBoundary fallback={<div>Error loading YouTube data</div>}>
//               <div className="mb-6 grid grid-cols-2">
//                 <img
//                     src={data.youtubeData.thumbnails.high.url}
//                     alt={data.youtubeData.title}
//                     className="w-40 h-40 mx-auto rounded-full"
//                 />
//                 <div className="flex flex-col justify-center">
//                   <h2 className="text-xl font-semibold mt-2">
//                     {data.youtubeData.title}
//                   </h2>
//                   <p className="text-gray-600">
//                     Subscribers: {data.youtubeStats.subscribers.toLocaleString()}
//                   </p>
//                   <p className="text-gray-600">
//                     Total Views: {data.youtubeStats.views.toLocaleString()}
//                   </p>
//                   <p className="text-gray-600">
//                     Videos: {data.youtubeStats.videos}
//                   </p>
//                 </div>
//               </div>
//             </ErrorBoundary>
//         )}

//         {/* Twitter Section */}
//         {hasTwitterData && (
//             <ErrorBoundary fallback={<div>Error loading Twitter data</div>}>
//               <div className="mb-6 border-t grid grid-cols-2">
//                 <img
//                     src={data.twitterData.profile_image_url}
//                     alt={data.twitterData.name}
//                     className="w-40 h-40 mx-auto rounded-full"
//                 />
//                 <div className="flex flex-col justify-center">
//                   <h2 className="text-xl font-semibold mt-2">
//                     {data.twitterData.name}
//                   </h2>
//                   <p className="text-gray-600">
//                     @{data.twitterData.username}
//                   </p>
//                   <p className="text-gray-600">
//                     Followers: {data.twitterStats.followers.toLocaleString()}
//                   </p>
//                   <p className="text-gray-600">
//                     Tweets: {data.twitterStats.tweets}
//                   </p>
//                 </div>
//               </div>
//             </ErrorBoundary>
//         )}
//       </div>
//   );
// };

// export default VenueStats;

// //todo refactor this code later
// class ErrorBoundary extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { hasError: false };
//   }

//   static getDerivedStateFromError(error) {
//     // Update state so the next render shows the fallback UI.
//     return { hasError: true };
//   }

//   componentDidCatch(error, errorInfo) {
//     // Log the error details if needed.
//     console.error("ErrorBoundary caught an error", error, errorInfo);
//   }

//   render() {
//     if (this.state.hasError) {
//       // Render fallback UI
//       return this.props.fallback || <div>Something went wrong.</div>;
//     }
//     return this.props.children;
//   }
// }

/* eslint-disable react/prop-types */
import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#FF0000", "#1DA1F2"]; 

const VenueStats = ({ data }) => {
  console.log("Stat Data:", data);

  const hasYoutubeData = data.youtubeStats && data.youtubeStats.subscribers;
  const hasTwitterData = data.twitterStats && data.twitterStats.followers;

  if (!hasYoutubeData && !hasTwitterData) {
    return <div className="h-44 lg:text-lg flex justify-center items-center">No Stat Data</div>;
  }

  let chartData = [];

  if (hasYoutubeData) {
    chartData.push({ name: "YouTube Subscribers", value: data.youtubeStats.subscribers });
  }
  if (hasTwitterData) {
    chartData.push({ name: "Twitter Followers", value: data.twitterStats.followers });
  }

  const total = chartData.reduce((sum, entry) => sum + entry.value, 0);

  const renderLabel = ({ name, value }) => {
    const percentage = ((value / total) * 100).toFixed(1);
    return `${name}: ${percentage}%`;
  };

  return (
    <div className="max-w-4xl mx-auto bg-white  p-2">
      <h2 className="text-xl font-semibold text-center mb-4">Subscriber & Follower Stats (%)</h2>

      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius="30%"
            outerRadius="70%"
            fill="#8884d8"
            dataKey="value"
            labelLine={true} 
            label={({ cx, cy, midAngle, outerRadius, percent, index }) => {
              const RADIAN = Math.PI / 180;
              const x = cx + (outerRadius + 0) * Math.cos(-midAngle * RADIAN);
              const y = cy + (outerRadius + 60) * Math.sin(-midAngle * RADIAN);

              return (
                <text
                  x={x}
                  y={y}
                  fill={COLORS[index % COLORS.length]}
                  textAnchor={x > cx ? "start" : "end"}
                  dominantBaseline="central"
                  fontSize="14px"
                  fontWeight="bold"
                >
                  {chartData[index].name}: {(percent * 100).toFixed(1)}%
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

export default VenueStats;
