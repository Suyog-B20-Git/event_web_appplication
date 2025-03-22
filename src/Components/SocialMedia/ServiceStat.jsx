/* eslint-disable react/prop-types */
import React, { Component } from "react";

const ServiceStats = ({ data }) => {
  console.log("stat", data);

  // Check if the necessary data exists for each section
  const hasYoutubeData = data.youtubeData && data.youtubeStats;
  const hasTwitterData = data.twitterData && data.twitterStats;

  // If no data is available, show a "No Stat Data" message
  if (!hasYoutubeData && !hasTwitterData) {
    return (
        <div className="h-44 lg:text-lg flex justify-center items-center">
          No Stat Data
        </div>
    );
  }

  return (
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl">
        {/* YouTube Section */}
        {hasYoutubeData && (
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
        {hasTwitterData && (
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
      </div>
  );
};

export default ServiceStats;

//todo refactor this code later
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service here.
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Render any custom fallback UI
      return this.props.fallback || <div>Something went wrong.</div>;
    }
    return this.props.children;
  }
}
