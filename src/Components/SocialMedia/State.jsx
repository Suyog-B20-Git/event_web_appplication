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
/* eslint-disable react/prop-types */

import React, { Component } from "react";

const PerformerStats = ({ data }) => {
  console.log("stat", data);

  // Check if any of the required data is available
  const hasData =
      data.youtubeData ||
      data.youtubeStats ||
      data.twitterData ||
      data.twitterStats ||
      data.spotifyData ||
      data.spotifyStats;

  return hasData ? (
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl">
        {/* YouTube Section */}
        {data.youtubeData && data.youtubeStats && (
            <ErrorBoundary fallback={<div>Error loading YouTube data</div>}>
              <div className="mb-6 grid grid-cols-2">
                <img
                    src={data.youtubeData.thumbnails.high.url}
                    alt={data.youtubeData.title}
                    className="w-40 h-40 mx-auto rounded-full"
                />
                <div className="flex flex-col justify-center">
                  <h2 className="text-xl font-semibold mt-2">
                    {data.youtubeData.title}
                  </h2>
                  <p className="text-gray-600">
                    Subscribers: {data.youtubeStats.subscribers.toLocaleString()}
                  </p>
                  <p className="text-gray-600">
                    Total Views: {data.youtubeStats.views.toLocaleString()}
                  </p>
                  <p className="text-gray-600">
                    Videos: {data.youtubeStats.videos}
                  </p>
                </div>
              </div>
            </ErrorBoundary>
        )}

        {/* Twitter Section */}
        {data.twitterData && data.twitterStats && (
            <ErrorBoundary fallback={<div>Error loading Twitter data</div>}>
              <div className="mb-6 border-t grid grid-cols-2">
                <img
                    src={data.twitterData.profile_image_url}
                    alt={data.twitterData.name}
                    className="w-40 h-40 mx-auto rounded-full"
                />
                <div className="flex flex-col justify-center">
                  <h2 className="text-xl font-semibold mt-2">
                    {data.twitterData.name}
                  </h2>
                  <p className="text-gray-600">
                    @{data.twitterData.username}
                  </p>
                  <p className="text-gray-600">
                    Followers: {data.twitterStats.followers.toLocaleString()}
                  </p>
                  <p className="text-gray-600">
                    Tweets: {data.twitterStats.tweets}
                  </p>
                </div>
              </div>
            </ErrorBoundary>
        )}

        {/* Spotify Section */}
        {data.spotifyData && data.spotifyStats && (
            <ErrorBoundary fallback={<div>Error loading Spotify data</div>}>
              <div className="grid grid-cols-2 border-t pt-5 mb-6">
                <img
                    src={data.spotifyData.images[0].url}
                    alt={data.spotifyData.name}
                    className="w-40 h-40 mx-auto mb-5 rounded-lg"
                />
                <div>
                  <h2 className="text-xl font-semibold mt-2">
                    {data.spotifyData.name}
                  </h2>
                  <p className="text-gray-600">
                    Followers: {data.spotifyStats.followers.toLocaleString()}
                  </p>
                  <p className="text-gray-600">
                    Popularity: {data.spotifyStats.popularity}
                  </p>
                  <a
                      href={data.spotifyData.spotify}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                  >
                    Listen on Spotify
                  </a>
                </div>
              </div>
            </ErrorBoundary>
        )}
      </div>
  ) : (
      <div className="h-44 lg:text-lg flex justify-center items-center">
        No Stat Data
      </div>
  );
};

export default PerformerStats;

//todo refactor this code later
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render shows the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error details if needed.
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <div>Something went wrong.</div>;
    }
    return this.props.children;
  }
}
