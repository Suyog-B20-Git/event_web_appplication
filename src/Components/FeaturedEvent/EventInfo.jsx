import React, { useState } from "react";

const EventInfo = () => {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className=" mx-auto p-4 rounded-lg shadow-lg">
      {/* Header */}
      <h1 className="text-2xl font-bold mb-4">Event Info</h1>

      {/* Highlights Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Highlights</h2>
        <ul className="text-gray-700">
          <li>A yoga community</li>
          <li>Unlimited yoga and meditation classes</li>
          <li>A stunning setting on the backwaters of Goa</li>
          <li>Easy access to the beach and nightlife</li>
          <li>Breakfast and lunch at the riverside restaurant</li>
          <li>2 nights accommodation</li>
        </ul>
      </div>

      {/* Skill Level Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Skill Level</h2>
        <ul className="text-gray-700">
          <li>Beginner</li>
          <li>Intermediate</li>
          <li>Advanced</li>
        </ul>
      </div>

      {/* Yoga Styles Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Yoga Styles</h2>
        <ul className="text-gray-700">
          <li>Hatha</li>
          <li>Vinyasa</li>
          <li>Restorative</li>
        </ul>
      </div>

      {/* Accommodation Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Accommodation</h2>
        <p className="text-gray-700">
          Check-in Time: 14:00
          <br />
          Check-out Time: 11:00
        </p>
        {showMore && (
          <p className="text-gray-700 mt-4">
            Palm Trees Ayurvedic Heritage offers a choice of private, semi-private, double, and twin cottages. Each cottage is designed to perfectly complement the natural environment in which it nestles. They are lovingly constructed from coconut wood and hand-woven coconut leaves from Kerala, the home of Ayurveda, to ensure that guests are always connected with nature during their stay. All furnishings have been locally sourced to highlight the local culture.
          </p>
        )}
      </div>

      {/* Show More/Less Button */}
      <button
        onClick={() => setShowMore(!showMore)}
        className="text-blue-500 font-semibold underline mt-4"
      >
        {showMore ? "Show Less" : "Show More"}
      </button>
    </div>
  );
};

export default EventInfo;
