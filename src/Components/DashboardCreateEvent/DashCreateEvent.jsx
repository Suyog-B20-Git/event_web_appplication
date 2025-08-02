import React, { useState, useEffect } from "react";
import Details from "./Details";
import Timings from "./Timing";
// import Tickets from "./External";
import Location from "./Location";
import Media from "./Media";
import SEO from "./SEO";
import Publish from "./Publish";
import NewVenueForm from "./NewVenueForm";
import axios from "axios";
// import toast, { Toaster } from "react-hot-toast";
import { useParams, useLocation } from "react-router-dom";

const baseUrl = "http://localhost:5000/api";

const tabs = [
  "Details",
  "Timings",
  // "External",
  "Location",
  "Media",
  "SEO",
  "Publish",
];

const DashCreateEvent = () => {
  const location = useLocation();
  const passedEventData = location.state;
  const { eventId } = useParams();
  const token = localStorage.getItem("authToken");

  const [activeTab, setActiveTab] = useState("Details");
  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);
  
const [toast, setToast] = useState(null);
const [confirmModal, setConfirmModal] = useState({ show: false, message: "" });


  // for saving data coming for all pages
  const [detailsData, setDetailsData] = useState({});
  const [timingData, setTimingData] = useState({});
  const [locationData, setLocationData] = useState({});
  // const [externalData, setExternalData] = useState({});
  const [mediaData, setMediaData] = useState({});
  const [seoData, setSeoData] = useState({});
  const [publishData, setPublishData] = useState({ tags: [] });
  const [newVenueFormData, setNewVenueFormData] = useState({});

  useEffect(() => {
    const fetchEventData = async () => {
      if (!eventId) return setLoading(false);

      try {
        const res = await axios.get(`${baseUrl}/event/${eventId}`, {
          headers: { Authorization: token },
        });
        setEventData(res.data);
      } catch (err) {
        console.error("Failed to fetch event:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEventData();
  }, [eventId, token]);

  const nextTab = () => {
    const currentIndex = tabs.indexOf(activeTab);
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1]);
    }
  };

  // converted into formData

  const convertPayloadToFormData = (payload) => {
    const formData = new FormData();

    // DETAILS
    const details = payload.details || {};
    formData.append("category", details.category || "");
    formData.append("type", details.type || "");
    formData.append("name", details.eventName || "");
    formData.append("eventUrl", details.eventUrl || "");
    formData.append("shortUrl", details.shortUrl || "");
    formData.append("excerpt", details.excerpt || "");
    formData.append("description", details.description || "");
    formData.append("whyToAttend", details.whyToAttend || "");
    formData.append(
      "offlinePaymentInstructions",
      details.offlinePaymentInstructions || ""
    );
    formData.append("currency", details.currency || "");
    formData.append("soldOut", details.soldOut || false);
    formData.append("enableRatingAndReview", details.enableReview || false);

    // TIMING
    const timing = payload.timing || {};
    const startDateTime = `${timing.startDate}T${timing.startTime}:00Z`;
    const endDateTime = `${timing.endDate}T${timing.endTime}:00Z`;
    formData.append("startDate", new Date(startDateTime).toISOString());
    formData.append("endDate", new Date(endDateTime).toISOString());

    // LOCATION
    const location = payload.location || {};
    formData.append("isOnline", location.isOnline || false);

    // // EXTERNAL
    // const external = payload.external || {};
    // formData.append("externalUrl", external.externalUrl || "");
    // formData.append("buttonText", external.buttonText || "");

    // MEDIA
    const media = payload.media || {};
    if (media.poster instanceof File) {
      formData.append("posterImage", media.poster);
    }
    if (Array.isArray(media.gallery)) {
      media.gallery.forEach((file, index) => {
        if (file instanceof File) {
          formData.append("images", file);
        }
      });
    }

    if (media.seatingChart instanceof File) {
      formData.append("seatingChartImage", media.seatingChart);
    }

    formData.append("videoUrl", media.videoUrl || "");
    formData.append("videoId", media.videoId || "");

    // SEO (stringified JSON)
    const seo = payload.seo || {};
    formData.append(
      "seo",
      JSON.stringify({
        metaTitle: seo.metaTitle || "",
        metaTags: seo.metaTags || "",
        metaDescription: seo.metaDescription || "",
      })
    );

    // TAGS (comma-separated string)
    if (Array.isArray(payload.tags)) {
      formData.append("tags", payload.tags.join(","));
    }

    return formData;
  };

  //  for saving data in publish page
  const handleSaveEvent = async () => {
    const token = localStorage.getItem("authToken");

    const isUpdate = detailsData?.id;

    const payload = {
      details: detailsData,
      timing: timingData,
      location: locationData,
      // external: externalData,
      media: mediaData,
      seo: seoData,
      tags: publishData.tags,
    };
    console.log("Payload being sent: ", payload);
    const formData = convertPayloadToFormData(payload);

    try {
      const resolvedEventId = passedEventData?.event?._id || eventId;
      if (resolvedEventId) {
        await axios.put(`${baseUrl}/event/${resolvedEventId}`, formData, {
          headers: { Authorization: token },
        });
      } else {
        await axios.post(`${baseUrl}/event`, formData, {
          headers: { Authorization: token },
        });
      }
      alert(`Event ${isUpdate ? "updated" : "created"} successfully`);
      // toast.success(`Event ${isUpdate ? "updated" : "created"} successfully!`);
    } catch (error) {
      alert("Failed to save event.");
      // toast.error("Failed to save event. Please check and try again.");
    }
  };

  useEffect(() => {
    console.log("DETAILS:", detailsData);
    console.log("TIMING:", timingData);
    console.log("LOCATION:", locationData);
    // console.log("EXTERNAL:", externalData);
    console.log("MEDIA:", mediaData);
    console.log("SEO:", seoData);
    console.log("PUBLISH:", publishData);
  }, [
    detailsData,
    timingData,
    locationData,
    // externalData,
    mediaData,
    seoData,
    publishData,
  ]);

  return (
    <div className="p-4 md:p-6 bg-white rounded-lg shadow-md max-w-8xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Update Event </h2>

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
        {!loading && (
          <>
            {activeTab === "Details" && (
              <Details
                data={detailsData}
                setData={setDetailsData}
                nextTab={nextTab}
              />
            )}
            {activeTab === "Timings" && (
              <Timings
                data={timingData}
                setData={setTimingData}
                nextTab={nextTab}
              />
            )}
            {/* {activeTab === "External" && (
              <Tickets
                data={externalData}
                setData={setExternalData}
                nextTab={nextTab}
              />
            )} */}
            {activeTab === "Location" && (
              <Location
                data={locationData}
                setData={setLocationData}
                nextTab={nextTab}
              />
            )}
            {activeTab === "Media" && (
              <Media
                data={mediaData}
                setData={setMediaData}
                nextTab={nextTab}
              />
            )}
            {activeTab === "SEO" && (
              <SEO data={seoData} setData={setSeoData} nextTab={nextTab} />
            )}
            {activeTab === "Publish" && (
              <Publish
                data={publishData}
                setData={setPublishData}
                onSave={handleSaveEvent}
              />
            )}
            {activeTab === "NewVenueForm" && (
              <NewVenueForm
                data={newVenueFormData}
                settData={setNewVenueFormData}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default DashCreateEvent;
