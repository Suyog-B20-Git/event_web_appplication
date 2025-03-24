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



/* eslint-disable react/prop-types */
import React, { Component } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

const OrganizerStats = ({ data }) => {
  console.log("stat", data);

  const hasYoutubeData = data.youtubeData && data.youtubeStats;
  const hasTwitterData = data.twitterData && data.twitterStats;

  if (!hasYoutubeData && !hasTwitterData) {
    return (
      <div className="h-44 lg:text-lg flex justify-center items-center text-gray-500">
        No Stat Data Available
      </div>
    );
  }

  const statsData = [];
  const COLORS = ["#FF0000", "#00A86B", "#0000FF", "#1DA1F2", "#FFD700"];

  if (hasYoutubeData) {
    statsData.push({ name: "YouTube Subscribers", value: data.youtubeStats.subscribers || 0 });
    statsData.push({ name: "YouTube Views", value: data.youtubeStats.views || 0 });
    statsData.push({ name: "YouTube Videos", value: data.youtubeStats.videos || 0 });
  }

  if (hasTwitterData) {
    statsData.push({ name: "Twitter Followers", value: data.twitterStats.followers || 0 });
    statsData.push({ name: "Twitter Tweets", value: data.twitterStats.tweets || 0 });
  }

  return (
    <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-100 to-green-100 shadow-xl rounded-xl p-6">
      {/* Pie Chart Section */}
      <div className="mt-6">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Popularity on Social Sites</h2>
        <ResponsiveContainer width="100%" height={350}>
          <PieChart>
            <Pie 
              data={statsData} 
              dataKey="value" 
              nameKey="name" 
              cx="50%" 
              cy="50%" 
              innerRadius={0}  // Smaller inner radius for a filled look
              outerRadius={120}  // Larger outer radius for visibility
              labelLine={false} 
              paddingAngle={5} 
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {statsData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" layout="horizontal" align="center" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default OrganizerStats;

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <div className="text-red-600 text-center p-4">Something went wrong, please try again later.</div>;
    }
    return this.props.children;
  }
}
