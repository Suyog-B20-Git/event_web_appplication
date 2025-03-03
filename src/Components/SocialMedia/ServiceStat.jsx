/* eslint-disable react/prop-types */
import React from "react";

const ServiceStats = ({ data }) => {
  console.log("stat", data);
  return (
    <div>
      {data.youtubeData &&
      data.youtubeStats &&
      data.twitterData &&
      data.twitterStats ? (
        <div className=" max-w-4xl mx-auto bg-white shadow-lg rounded-xl">
          {/* YouTube Section */}
          <div className="mb-6 grid grid-cols-2 ">
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

          {/* Twitter Section */}
          <div className="mb-6 border-t  grid grid-cols-2 ">
            <img
              src={data.twitterData.profile_image_url}
              alt={data.twitterData.name}
              className="w-40 h-40  mx-auto rounded-full"
            />
            <div>
              <h2 className="text-xl font-semibold mt-2">
                {data.twitterData.name}
              </h2>
              <p className="text-gray-600">@{data.twitterData.username}</p>
              <p className="text-gray-600">
                Followers: {data.twitterStats.followers.toLocaleString()}
              </p>
              <p className="text-gray-600">
                Tweets: {data.twitterStats.tweets}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-44   lg:text-lg flex justify-center items-center">
          No Stat Data
        </div>
      )}
    </div>
  );
};

export default ServiceStats;
