import React, { useState } from "react";

const Overview = () => {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className=" mx-auto p-4 rounded-lg shadow-md">
      {/* Header */}
      <h1 className="text-2xl font-bold mb-4">Overview</h1>

      {/* Program Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Program</h2>
        <p className="text-gray-700">
          The daily schedule runs throughout the day offering yoga and
          meditation. Classes include Vinyasa Flow, Hatha for beginners,
          pranayama and meditation, afternoon Restorative yoga or Yin yoga,
          Rocket yoga, and more. A typical schedule is as follows:
        </p>
        <ul className="text-gray-700 mt-2">
          <li>08:00 Vinyasa flow</li>
          <li>16:00 Restorative/Yin yoga</li>
        </ul>
        {showMore && (
          <p className="text-gray-700 mt-4">
            Palm Trees Ayurvedic Heritage caters for all levels of yogis and
            private classes are available on request. Some classes, where
            appropriate, will be scheduled with the YTTC that runs at certain
            times during the season. Guests can attend as many or as few yoga
            classes, having time to relax and unwind on the resort or at nearby
            Patnem Beach. The retreat offers the flexibility for you to create
            the yoga holiday that you need.
          </p>
        )}
      </div>

      {/* Food Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Food</h2>
        <p className="text-gray-700">
          There is an onsite riverside restaurant. A healthy breakfast of your
          choice will be provided as part of the retreat. Lunch will be provided
          which includes a Veg Thali. Vegan and other dietary requirements can
          be catered for. For dinner, guests can take advantage of nearby
          restaurants serving local Goan cuisine on Patnem Beach; alternatively,
          dinner can be ordered from the menu at the resort.
        </p>
        {showMore && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold">
              The following drinks are included:
            </h3>
            <ul className="text-gray-700">
              <li>Water</li>
              <li>Coffee</li>
              <li>Tea</li>
            </ul>

            <h3 className="text-lg font-semibold mt-4">
              The following dietary requirement(s) are served and/or catered
              for:
            </h3>
            <ul className="text-gray-700">
              <li>Vegetarian</li>
              <li>Vegan</li>
              <li>Seafood</li>
              <li>Yogic</li>
              <li>Ayurvedic</li>
            </ul>
          </div>
        )}
      </div>

      {/* Optional Section */}
      {showMore && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            Things to do (optional)
          </h2>
          <ul className="text-gray-700">
            <li>A consultation with our local Ayurvedic Doctor</li>
            <li>Private yoga classes</li>
            <li>Additional nights accommodation</li>
            <li>Snacks and Dinner at the riverside restaurant</li>
          </ul>
        </div>
      )}

      {/* Spa Treatments */}
      {showMore && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Spa treatments</h2>
          <p className="text-gray-700">
            Palm Trees Ayurvedic Heritage Ayurvedic Spa offers the following
            treatments:
          </p>
          <ul className="text-gray-700 mt-2">
            <li>Abhyangam / Ayurvedic massage</li>
            <li>Shirodhara</li>
            <li>Herbal body scrub</li>
            <li>Ayurvedic herbal facial</li>
            <li>Head, hand or foot massage</li>
          </ul>
        </div>
      )}

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

export default Overview;
