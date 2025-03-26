// /* eslint-disable react/prop-types */
// import React from "react";

// const PerformerStats = ({ data }) => {
//   console.log("stat", data);
//   return (
//     <div className=" max-w-4xl mx-auto bg-white shadow-lg rounded-xl">
//       {/* YouTube Section */}
//       <div className="mb-6 grid grid-cols-2 ">
//         <img
//           src={data.youtubeData.thumbnails.high.url}
//           alt={data.youtubeData.title}
//           className="w-40 h-40 mx-auto rounded-full"
//         />
//         <div className="flex flex-col justify-center">
//           <h2 className="text-xl font-semibold mt-2">
//             {data.youtubeData.title}
//           </h2>
//           <p className="text-gray-600">
//             Subscribers: {data.youtubeStats.subscribers.toLocaleString()}
//           </p>
//           <p className="text-gray-600">
//             Total Views: {data.youtubeStats.views.toLocaleString()}
//           </p>
//           <p className="text-gray-600">Videos: {data.youtubeStats.videos}</p>
//         </div>
//       </div>

//       {/* Twitter Section */}
//       <div className="mb-6 border-t  grid grid-cols-2 ">
//         <img
//           src={data.twitterData.profile_image_url}
//           alt={data.twitterData.name}
//           className="w-40 h-40  mx-auto rounded-full"
//         />
//         <div>
//           <h2 className="text-xl font-semibold mt-2">
//             {data.twitterData.name}
//           </h2>
//           <p className="text-gray-600">@{data.twitterData.username}</p>
//           <p className="text-gray-600">
//             Followers: {data.twitterStats.followers.toLocaleString()}
//           </p>
//           <p className="text-gray-600">Tweets: {data.twitterStats.tweets}</p>
//         </div>
//       </div>

//       {/* Spotify Section  */}
//        <div className="  grid grid-cols-2 border-t pt-5 mb-6">
//         <img
//           src={data.spotifyData.images[0].url}
//           alt={data.spotifyData.name}
//           className="w-40 h-40 mx-auto mb-5 rounded-lg"
//         />
//         <div>
//           <h2 className="text-xl font-semibold mt-2">
//             {data.spotifyData.name}
//           </h2>
//           <p className="text-gray-600">
//             Followers: {data.spotifyStats.followers.toLocaleString()}
//           </p>
//           <p className="text-gray-600">
//             Popularity: {data.spotifyStats.popularity}
//           </p>
//           <a
//             href={data.spotifyData.spotify}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="text-blue-500 underline"
//           >
//             Listen on Spotify
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PerformerStats;

// /* eslint-disable react/prop-types */
// import React from "react";
// import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

// const COLORS = ["#FF0000", "#1DA1F2", "#1DB954"]; 

// const PerformerStats = ({ data }) => {
//   console.log("Stat Data:", data);

//   const hasYoutubeData = data.youtubeStats && data.youtubeStats.subscribers;
//   const hasTwitterData = data.twitterStats && data.twitterStats.followers;
//   const hasSpotifyData = data.spotifyStats && data.spotifyStats.followers;

//   if (!hasYoutubeData && !hasTwitterData && !hasSpotifyData) {
//     return <div className="h-44 lg:text-lg flex justify-center">No Stat Data</div>;
//   }

//   let chartData = [];

//   if (hasYoutubeData) {
//     chartData.push({ name: "YouTube Subscribers", value: data.youtubeStats.subscribers });
//   }
//   if (hasTwitterData) {
//     chartData.push({ name: "Twitter Followers", value: data.twitterStats.followers });
//   }
//   if (hasSpotifyData) {
//     chartData.push({ name: "Spotify Followers", value: data.spotifyStats.followers });
//   }

//   const total = chartData.reduce((sum, entry) => sum + entry.value, 0);

//   return (
//     <div className="max-w-4xl mx-auto bg-white  p-4">
//       <h2 className="text-xl font-semibold text-center mb-2">Performer Subscriber & Follower Stats (%)</h2>

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
//               const x = cx + (outerRadius + 30) * Math.cos(-midAngle * RADIAN);
//               const y = cy + (outerRadius + 20) * Math.sin(-midAngle * RADIAN);

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

// export default PerformerStats;
/* eslint-disable react/prop-types */
import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#FF0000", "#1DA1F2", "#1DB954"];

const PerformerStats = ({ data }) => {
  console.log("Stat Data:", data);

  const hasYoutubeData = data.youtubeStats && data.youtubeStats.subscribers;
  const hasTwitterData = data.twitterStats && data.twitterStats.followers;
  const hasSpotifyData = data.spotifyStats && data.spotifyStats.followers;

  if (!hasYoutubeData && !hasTwitterData && !hasSpotifyData) {
    return <div className="h-44 lg:text-lg flex justify-center">No Stat Data</div>;
  }

  let chartData = [];

  if (hasYoutubeData) {
    chartData.push({ name: "YouTube Subscribers", value: data.youtubeStats.subscribers });
  }
  if (hasTwitterData) {
    chartData.push({ name: "Twitter Followers", value: data.twitterStats.followers });
  }
  if (hasSpotifyData) {
    chartData.push({ name: "Spotify Followers", value: data.spotifyStats.followers });
  }

  const total = chartData.reduce((sum, entry) => sum + entry.value, 0);

  return (
    <div className="max-w-4xl mx-auto bg-white p-4">
      <h2 className="text-xl font-semibold text-center mb-2">
        Performer Subscriber & Follower Stats (%)
      </h2>

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
              const x = cx + (outerRadius + 30) * Math.cos(-midAngle * RADIAN);
              const y = cy + (outerRadius + 20) * Math.sin(-midAngle * RADIAN);

              // Splitting the name into two lines dynamically
              const words = chartData[index].name.split(" ");
              const firstLine = words[0]; // First word (e.g., "YouTube")
              const secondLine = words.slice(1).join(" "); // Remaining words (e.g., "Subscribers")

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
                  <tspan x={x} dy="-1.2em">{firstLine}</tspan>
                  <tspan x={x} dy="1.2em">{secondLine}</tspan>
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

export default PerformerStats;
