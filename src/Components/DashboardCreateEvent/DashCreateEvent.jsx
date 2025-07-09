import React, { useState } from "react";
import Details from "./Details";
import Timings from "./Timing";
import Tickets from "./External";
import Location from "./Location";
import Media from "./Media";
import SEO from "./SEO";
import Publish from "./Publish";
import NewVenueForm from "./NewVenueForm";


const tabs = ["Details", "Timings", "External", "Location", "Media", "SEO", "Publish"];

const DashCreateEvent = () => {
  const [activeTab, setActiveTab] = useState("Details");
   const [activeSection, setActiveSection] = useState("DashCreateEvent");

  const nextTab = () => {
    const currentIndex = tabs.indexOf(activeTab);
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1]);
    }
  };

  return (
    <div className="p-4 md:p-6 bg-white rounded-lg shadow-md max-w-8xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Update Event - abc123</h2>

      
      <div className="flex flex-wrap gap-2 border-b mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-t ${
              activeTab === tab
                ? "bg-[#ff2459] text-white"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Conditional Tab Content */}
      <div>
        {activeTab === "Details" && <Details nextTab={nextTab} />}
        {activeTab === "Timings" && <Timings nextTab={nextTab} />}
        {activeTab === "External" && <Tickets nextTab={nextTab} />}
        {activeTab === "Location" && <Location nextTab={nextTab} />}
        {activeTab === "Media" && <Media nextTab={nextTab} />}
        {activeTab === "SEO" && <SEO nextTab={nextTab} />}
        {activeTab === "Publish" && <Publish />}
        {activeTab === "NewVenueForm" && <NewVenueForm />}
      </div>
    </div>
  );
};

export default DashCreateEvent;
