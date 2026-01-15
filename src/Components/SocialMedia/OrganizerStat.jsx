
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
  FaSpotify,
  FaInstagram,
  FaSoundcloud,
  FaFacebook,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

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

const formatCount = (count) => {
  if (count >= 1_000_000) return (count / 1_000_000).toFixed(1) + "M";
  if (count >= 1_000) return (count / 1_000).toFixed(1) + "K";
  return count.toString();
};

const StatCard = ({ label, value, color }) => (
  <div
    className="flex flex-col items-center rounded-md px-4 py-2 shadow transition-transform transform hover:scale-105"
    style={{ boxShadow: `0 2px 8px ${color}aa`, minWidth: 90 }}
  >
    <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">{label}</div>
    <div className="text-lg font-normal text-gray-900 dark:text-white">
      {formatCount(value)}
    </div>
  </div>
);

const OrganizerStats = ({ data }) => {
  const platforms = [
    {
      name: "YouTube",
      stats: data?.youtubeStats,
      labels: ["Subscribers", "Videos", "Views"],
    },
    {
      name: "Twitter",
      stats: data?.twitterStats,
      labels: ["Followers", "Tweets", "Likes"],
    },
    {
      name: "Spotify",
      stats: data?.spotifyStats,
      labels: ["Followers", "Tracks", "Likes"],
    },
    {
      name: "Instagram",
      stats: data?.instagramStats,
      labels: ["Followers", "Videos", "Images", "Likes"],
    },
    {
      name: "Soundcloud",
      stats: data?.soundcloudStats,
      labels: ["Followers", "Tracks", "Likes"],
    },
    {
      name: "Facebook",
      stats: data?.facebookStats,
      labels: ["Followers", "Videos", "Images", "Likes"],
    },
  ];

  const activePlatforms = platforms.filter(
    (p) => p.stats && Object.values(p.stats).some((v) => v && v !== 0)
  );

  const chartData = activePlatforms.map((p) => ({
    name: p.name,
    followers: p.stats.subscribers || p.stats.followers || 0,
    color: COLORS[p.name],
  }));

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100 mb-6">
        Organizer Stats Overview
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
            <Bar dataKey="followers" barSize={25} radius={[8, 8, 0, 0]}>
              {chartData.map((entry, index) => (
                <cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Cards */}
      <div className="flex flex-col space-y-6">
        {activePlatforms.map((platform) => {
          const stats = platform.stats;
          const color = COLORS[platform.name];
          const icon = ICONS[platform.name];

          return (
            <div
              key={platform.name}
              className="bg-white dark:bg-gray-800 rounded-lg p-4 transition-transform hover:scale-[1.01] hover:shadow-lg"
              style={{ boxShadow: `0 4px 12px ${color}55` }}
            >
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

              <div className="flex flex-wrap gap-4 w-full justify-start">
                {platform.labels.map((label) => (
                  <StatCard
                    key={label}
                    label={label}
                    value={stats[label.toLowerCase()] || 0}
                    color={color}
                  />
                ))}
              </div>

              {stats?.topPosts?.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mt-4">
                  {stats.topPosts.slice(0, 10).map((item, idx) => (
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
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrganizerStats;
