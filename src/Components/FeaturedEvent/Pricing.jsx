import React from "react";

const PricingCard = () => {
  return (
    <div className="  border shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Pricing</h2>
      
      {/* Large Event */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800">- LARGE EVENT</h3>
        <p className="text-gray-700">$997</p>
        <ul className="list-disc pl-6 text-gray-700">
          <li>Facility</li>
          <li>Tables</li>
          <li>Chairs</li>
          <li>Attendant</li>
          <li>Day or Night Event</li>
          <li>Up to 130 guests</li>
          <li>2 hr prior for decor</li>
          <li>4 hr of event time</li>
          <li>1 hr of cleanup</li>
        </ul>
      </div>

      {/* Medium Event */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800">- MEDIUM EVENT</h3>
        <p className="text-gray-700">$697</p>
        <ul className="list-disc pl-6 text-gray-700">
          <li>Daytime or Nighttime Event</li>
          <li>31 to 75 guests</li>
          <li>1 hr prior for decor</li>
          <li>4 hr of event time</li>
          <li>1 hr of cleanup</li>
        </ul>
      </div>

      {/* Small Event */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800">- SMALL EVENT</h3>
        <p className="text-gray-700">$397</p>
        <ul className="list-disc pl-6 text-gray-700">
          <li>Daytime Only</li>
          <li>Up to 30 guests</li>
          <li>1 hr prior for decor</li>
          <li>3 hr of event time</li>
          <li>1 hr of cleanup</li>
        </ul>
      </div>
    </div>
  );
};

export default PricingCard;
