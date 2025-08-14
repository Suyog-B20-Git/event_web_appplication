import React, { useState, useEffect } from "react";
import Details from "./Details";
import Timings from "./Timing";
// import Tickets from "./External";
import Location from "./Location";
import Media from "./Media";
import Performers from "./Performers";
import SocialMedia from "./SocialMedia";
import Repetitive from "./Repetitive";
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
  "Performers",
  "Social Media",
  "Repetitive",
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
  const [performersData, setPerformersData] = useState({ performersYtLinks: [] });
  const [socialMediaData, setSocialMediaData] = useState({
    performerFacebookLinks: [],
    venueFacebookLinks: [],
    youtubeLinks: []
  });
  const [repetitiveData, setRepetitiveData] = useState({
    repeatExcept: [],
    repeatDates: [],
    repeatDays: [],
    repeatStartTime: "",
    repeatEndTime: ""
  });

  useEffect(() => {
    const fetchEventData = async () => {
      // Get event ID from URL params or navigation state
      const eventIdToFetch = eventId || passedEventData?.event?._id;

      if (!eventIdToFetch) return setLoading(false);

      try {
        const res = await axios.get(`${baseUrl}/event/${eventIdToFetch}`, {
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
  }, [eventId, passedEventData?.event?._id, token]);

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
    formData.append("disableEventAfterSoldOut", details.soldOut || false);
    formData.append("enableRatingAndReview", details.enableReview || false);

    // TIMING
    const timing = payload.timing || {};
    const startDateTime = `${timing.startDate}T${timing.startTime}:00Z`;
    const endDateTime = `${timing.endDate}T${timing.endTime}:00Z`;
    formData.append("startDate", new Date(startDateTime).toISOString());
    formData.append("endDate", new Date(endDateTime).toISOString());

    // Repetitive settings
    formData.append("isRepetitive", timing.isRepetitive || false);
    formData.append("repetitiveType", timing.repetitiveType || "");
    formData.append("isSeasonal", timing.isSeasonal || false);

    // LOCATION
    const location = payload.location || {};
    formData.append("isOnline", location.isOnline || false);
    formData.append("venue", location.venue || "");

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

    // PERFORMERS
    const performers = payload.performers || {};
    if (Array.isArray(performers.performersYtLinks)) {
      formData.append("performersYtLinks", performers.performersYtLinks.join(","));
    }

    // SOCIAL MEDIA
    const socialMedia = payload.socialMedia || {};
    if (Array.isArray(socialMedia.performerFacebookLinks)) {
      formData.append("performerFacebookLinks", socialMedia.performerFacebookLinks.join(","));
    }
    if (Array.isArray(socialMedia.venueFacebookLinks)) {
      formData.append("venueFacebookLinks", socialMedia.venueFacebookLinks.join(","));
    }
    if (Array.isArray(socialMedia.youtubeLinks)) {
      formData.append("youtubeLinks", socialMedia.youtubeLinks.join(","));
    }

    // REPETITIVE SETTINGS
    const repetitive = payload.repetitive || {};
    if (Array.isArray(repetitive.repeatExcept)) {
      formData.append("repeatExcept", repetitive.repeatExcept.join(","));
    }
    if (Array.isArray(repetitive.repeatDates)) {
      formData.append("repeatDates", repetitive.repeatDates.join(","));
    }
    if (Array.isArray(repetitive.repeatDays)) {
      formData.append("repeatDays", repetitive.repeatDays.join(","));
    }
    formData.append("repeatStartTime", repetitive.repeatStartTime || "");
    formData.append("repeatEndTime", repetitive.repeatEndTime || "");

    // TAGS (comma-separated string)
    if (Array.isArray(payload.tags)) {
      formData.append("eventTags", payload.tags.join(","));
    }

    // PUBLISH SETTINGS
    const publish = payload.publish || {};
    formData.append("isPublish", publish.isPublish || false);
    formData.append("isFeatured", publish.isFeatured || false);
    formData.append("isEnabled", publish.isEnabled || false);

    return formData;
  };

  //  for saving data in publish page
  const handleSaveEvent = async () => {
    const token = localStorage.getItem("authToken");

    const isUpdate = eventData?._id;

    const payload = {
      details: detailsData,
      timing: timingData,
      location: locationData,
      media: mediaData,
      performers: performersData,
      socialMedia: socialMediaData,
      repetitive: repetitiveData,
      seo: seoData,
      publish: publishData,
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
    console.log("PERFORMERS:", performersData);
    console.log("SOCIAL MEDIA:", socialMediaData);
    console.log("REPETITIVE:", repetitiveData);
    console.log("SEO:", seoData);
    console.log("PUBLISH:", publishData);
  }, [
    detailsData,
    timingData,
    locationData,
    // externalData,
    mediaData,
    performersData,
    socialMediaData,
    repetitiveData,
    seoData,
    publishData,
  ]);

  // Determine if we're in edit mode
  const isEditMode = passedEventData?.event?._id || eventId || eventData;

  return (
    <div className="p-4 md:p-6 bg-white rounded-lg shadow-md max-w-8xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">{isEditMode ? "Update Event" : "Create Event"}</h2>

      <div className="flex flex-wrap gap-2 border-b mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-t ${activeTab === tab
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
                eventData={eventData}
              />
            )}
            {activeTab === "Timings" && (
              <Timings
                data={timingData}
                setData={setTimingData}
                nextTab={nextTab}
                eventData={eventData}
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
                eventData={eventData}
              />
            )}
            {activeTab === "Media" && (
              <Media
                data={mediaData}
                setData={setMediaData}
                nextTab={nextTab}
                eventData={eventData}
              />
            )}
            {activeTab === "Performers" && (
              <Performers
                data={performersData}
                setData={setPerformersData}
                nextTab={nextTab}
                eventData={eventData}
              />
            )}
            {activeTab === "Social Media" && (
              <SocialMedia
                data={socialMediaData}
                setData={setSocialMediaData}
                nextTab={nextTab}
                eventData={eventData}
              />
            )}
            {activeTab === "Repetitive" && (
              <Repetitive
                data={repetitiveData}
                setData={setRepetitiveData}
                nextTab={nextTab}
                eventData={eventData}
              />
            )}
            {activeTab === "SEO" && (
              <SEO data={seoData} setData={setSeoData} nextTab={nextTab} eventData={eventData} />
            )}
            {activeTab === "Publish" && (
              <Publish
                data={publishData}
                setData={setPublishData}
                onSave={handleSaveEvent}
                eventData={eventData}
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
