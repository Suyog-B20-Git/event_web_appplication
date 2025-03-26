// /* eslint-disable react/prop-types */
// import React, {Component} from "react";
// const OrganizerStats = ({ data }) => {
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

// export default OrganizerStats;

// //todo refactor this codee later
// class ErrorBoundary extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { hasError: false };
//   }

//   static getDerivedStateFromError(error) {
//     // Update state so the next render will show the fallback UI.
//     return { hasError: true };
//   }

//   componentDidCatch(error, errorInfo) {
//     // You can also log the error to an error reporting service here.
//     console.error('ErrorBoundary caught an error', error, errorInfo);
//   }

//   render() {
//     if (this.state.hasError) {
//       // Render any custom fallback UI
//       return this.props.fallback || <div>Something went wrong.</div>;
//     }

//     return this.props.children;
//   }
// }



// /* eslint-disable react/prop-types */
// import React from "react";
// import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

// const COLORS = ["#FF0000", "#1DA1F2"];

// const OrganizerStats = ({ data }) => {
//   console.log("Stat Data:", data);

//   const hasYoutubeData = data.youtubeStats && data.youtubeStats.subscribers;
//   const hasTwitterData = data.twitterStats && data.twitterStats.followers;

//   if (!hasYoutubeData && !hasTwitterData) {
//     return <div className="h-44 lg:text-lg flex justify-center">No Stat Data</div>;
//   }

//   let chartData = [];

//   if (hasYoutubeData) {
//     chartData.push({ name: "YouTube Subscribers", value: data.youtubeStats.subscribers });
//   }
//   if (hasTwitterData) {
//     chartData.push({ name: "Twitter Followers", value: data.twitterStats.followers });
//   }

//   const total = chartData.reduce((sum, entry) => sum + entry.value, 0);

//   return (
//     <div className="max-w-4xl mx-auto bg-white">
//       <h2 className="text-xl font-semibold text-center">Subscriber & Follower Stats (%)</h2>

//       <ResponsiveContainer width="100%" height={300}>
//         <PieChart>
//           <Pie
//             data={chartData}
//             cx="50%"
//             cy="50%"
//             innerRadius="30%"
//             outerRadius="70%"
//             fill="#8884d8"
//             dataKey="value"
//             label={({ cx, cy, midAngle, outerRadius, percent, index }) => {
//               const RADIAN = Math.PI / 180;
//               const x = cx + (outerRadius + 20) * Math.cos(-midAngle * RADIAN);
//               const y = cy + (outerRadius + 60) * Math.sin(-midAngle * RADIAN);

//               return (
//                 <text
//                   x={x}
//                   y={y}
//                   fill={COLORS[index % COLORS.length]}
//                   textAnchor={x > cx ? "start" : "end"}
//                   dominantBaseline="central"
//                   fontSize="14px"
//                   fontWeight="bold"
//                 >
//                   {chartData[index].name}: {(percent * 100).toFixed(1)}%
//                 </text>
//               );
//             }}
//           >
//             {chartData.map((entry, index) => (
//               <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//             ))}
//           </Pie>
//           <Tooltip formatter={(value) => `${((value / total) * 100).toFixed(1)}%`} />
//           <Legend />
//         </PieChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default OrganizerStats;


/* eslint-disable react/prop-types */
import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#FF0000", "#1DA1F2"];

const OrganizerStats = ({ data }) => {
  console.log("Stat Data:", data);

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
