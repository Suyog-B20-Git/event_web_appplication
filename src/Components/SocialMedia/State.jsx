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
// ********************************************************************************************************
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
//  eslint-disable react/prop-types 
// import React from "react";
// import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

// const COLORS = ["#FF0000", "#1DA1F2", "#1DB954"];

// const PerformerStats = ({ data }) => {
//   console.log("Stat Data:", data);
// const hasYoutubeData = data.youtubeStats && data.youtubeStats.subscribers;
//   const hasTwitterData = data.twitterStats && data.twitterStats.followers;
//   const hasSpotifyData = data.spotifyStats && data.spotifyStats.followers;
//   
//   if (!hasYoutubeData && !hasTwitterData && !hasSpotifyData ) {
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
// ********************************************************************************************************

// ... (keep imports same)

import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import {
  FaYoutube,
  FaTwitter,
  FaSpotify,
  FaInstagram,
  FaSoundcloud,
  FaFacebook,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

// Platform colors and icons
const COLORS = {
  YouTube: "#FF0000",
  Twitter: "#000000",
  Spotify: "#1DB954",
  Instagram: "#C13584",
  Soundcloud: "#FF5500",
  Facebook: "#1877F2",
};

const ICONS = {
  YouTube: <FaYoutube size={30} />,
  Twitter: <FaXTwitter size={30} />,
  Spotify: <FaSpotify size={30} />,
  Instagram: <FaInstagram size={30} />,
  Soundcloud: <FaSoundcloud size={30} />,
  Facebook: <FaFacebook size={30} />,
};

// Format numbers for readability
const formatCount = (count) => {
  if (count >= 1_000_000) return (count / 1_000_000).toFixed(1) + "M";
  if (count >= 1_000) return (count / 1_000).toFixed(1) + "K";
  return count.toString();
};

// Stat card component
const StatCard = ({ label, value, color }) => (
  <div
    className="flex flex-col items-center rounded-md px-4 py-2 shadow transition-transform transform hover:scale-105"
    style={{
      boxShadow: `0 2px 8px ${color}aa`,
      minWidth: 90,
    }}
  >
    <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">{label}</div>
    <div className="text-lg font-normal text-gray-900 dark:text-white">
      {formatCount(value)}
    </div>
  </div>
);

// Main component
const PerformerStats = ({ data }) => {
  const platforms = [
    {
      name: "YouTube",
      stats: data?.youtubeStats || null,
      labels: ["Subscribers", "Videos", "Views"],
    },
    {
      name: "Twitter",
      stats: data?.twitterStats || null,
      labels: ["Followers", "Tweets", "Likes"],
    },
    {
      name: "Spotify",
      stats: data?.spotifyStats || null,
      labels: ["Followers", "Tracks", "Likes"],
    },
    {
      name: "Instagram",
      stats: data?.instagramStats || null,
      labels: ["Followers", "Videos", "Images", "Likes"],
    },
    {
      name: "Soundcloud",
      stats: data?.soundcloudStats || null,
      labels: ["Followers", "Tracks", "Likes"],
    },
    {
      name: "Facebook",
      stats: data?.facebookStats || null,
      labels: ["Followers", "Videos", "Images", "Likes"],
    },
  ];

  // Filter platforms with real stats
  const activePlatforms = platforms.filter((p) => {
    const s = p.stats;
    return s && Object.values(s).some((v) => v && v !== 0);
  });

  // Bar chart data
  const chartData = activePlatforms.map((p) => ({
    name: p.name,
    followers: p.stats.subscribers || p.stats.followers || 0,
    color: COLORS[p.name],
  }));

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100 mb-6">
        Performer Stats Overview
      </h2>

      {/* Bar Chart */}
      <div className="mb-10" style={{ height: 250 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" stroke="#888" />
            <YAxis
              stroke="#888"
              tickFormatter={(val) =>
                val >= 1_000_000
                  ? `${val / 1_000_000}M`
                  : val >= 1_000
                  ? `${val / 1_000}K`
                  : val
              }
            />
            <Tooltip
              formatter={(value) => formatCount(value)}
              labelFormatter={(label) => `Platform: ${label}`}
            />
            <Bar
              dataKey="followers"
              barSize={25}
              radius={[8, 8, 0, 0]}
              fill="#8884d8"
            >
              {chartData.map((entry, index) => (
                <cell
                  key={`cell-${index}`}
                  fill={entry.color}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Social Platform Cards */}
      <div className="flex flex-col space-y-6">
        {activePlatforms.map((platform) => {
          const stats = platform.stats;
          const color = COLORS[platform.name];
          const icon = ICONS[platform.name];

          return (
            <div
              key={platform.name}
              className="bg-white dark:bg-gray-800 rounded-lg p-4 transition-transform hover:scale-[1.01] hover:shadow-lg"
              style={{
                boxShadow: `0 4px 12px ${color}55`,
              }}
            >
              {/* Logo and Name */}
              <div className="flex items-center mb-4">
                <div
                  className="flex items-center justify-center rounded-full p-4 shadow-md flex-shrink-0"
                  style={{
                    backgroundColor: "#fff",
                    boxShadow: `0 6px 16px ${color}bb`,
                    width: 70,
                    height: 70,
                    marginRight: 20,
                    color,
                  }}
                >
                  {icon}
                </div>
                <div className="font-semibold text-gray-800 dark:text-gray-100 text-xl">
                  {platform.name}
                </div>
              </div>

              {/* Stat Cards */}
              <div className="flex flex-wrap gap-4">
                {platform.labels.map((label) => (
                  <StatCard
                    key={label}
                    label={label}
                    value={stats[label.toLowerCase()] || 0}
                    color={color}
                  />
                ))}
              </div>

              {/* Top Posts */}
              <div className="grid grid-cols-5 gap-4 mt-4">
                {(stats?.topPosts || []).slice(0, 10).map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-gray-100 dark:bg-gray-700 rounded-md p-2 text-xs text-gray-800 dark:text-white shadow hover:shadow-md hover:scale-105 transition-transform"
                  >
                    <img
                      src={item.thumbnail}
                      alt="thumb"
                      className="w-full h-20 object-cover rounded"
                    />
                    <div className="mt-1 font-semibold truncate">
                      {item.title}
                    </div>
                    <div>👍 {formatCount(item.likes)}</div>
                    <div>{new Date(item.date).toLocaleDateString()}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PerformerStats;
