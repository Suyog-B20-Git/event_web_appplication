import React, { useState, useEffect, useCallback } from "react";
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import './DashCreateEvent.css';
import Details from "./Details";
import Timings from "./Timing";
// import Tickets from "./External";
import Location from "./Location";
import Media from "./Media";
import Performers from "./Performers";
import SocialMedia from "./SocialMedia";
import SEO from "./SEO";
import Publish from "./Publish";
import NewVenueForm from "./NewVenueForm";
import axios from "axios"; // Keep for fetching event data
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa';
import { useDispatch } from "react-redux";
import { createNewEvent } from "../../redux/actions/master/Events/CreateEvent";
import { updateEvent } from "../../redux/actions/master/Events/UpdateEvent";

// Custom Confirmation Dialog Component
const ConfirmationDialog = ({ isOpen, onClose, onConfirm, title, message, confirmText, cancelText, type = 'warning' }) => {
  if (!isOpen) return null;

  const getIcon = () => {
    switch (type) {
      case 'danger':
        return <FaExclamationTriangle className="text-red-500 text-4xl" />;
      case 'success':
        return <FaCheckCircle className="text-green-500 text-4xl" />;
      default:
        return <FaExclamationTriangle className="text-yellow-500 text-4xl" />;
    }
  };

  const getButtonStyles = () => {
    switch (type) {
      case 'danger':
        return {
          confirm: 'bg-red-500 hover:bg-red-600 text-white',
          cancel: 'bg-gray-200 hover:bg-gray-300 text-gray-800'
        };
      case 'success':
        return {
          confirm: 'bg-green-500 hover:bg-green-600 text-white',
          cancel: 'bg-gray-200 hover:bg-gray-300 text-gray-800'
        };
      default:
        return {
          confirm: 'bg-blue-500 hover:bg-blue-600 text-white',
          cancel: 'bg-gray-200 hover:bg-gray-300 text-gray-800'
        };
    }
  };

  const buttonStyles = getButtonStyles();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full transform transition-all">
        <div className="p-6">
          <div className="flex items-center justify-center mb-4">
            {getIcon()}
          </div>
          <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">
            {title}
          </h3>
          <p className="text-gray-600 text-center mb-6">
            {message}
          </p>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${buttonStyles.cancel}`}
            >
              {cancelText || 'Cancel'}
            </button>
            <button
              onClick={onConfirm}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${buttonStyles.confirm}`}
            >
              {confirmText || 'Confirm'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const baseUrl = "https://dev.eventsnode.com/api";
// const baseUrl = "http://localhost:5000/api";

const tabs = [
  { id: 0, label: "Details" },
  { id: 1, label: "Timings" },
  // { id: 2, label: "External" },
  { id: 2, label: "Location" },
  { id: 3, label: "Media" },
  { id: 4, label: "Performers" },
  { id: 5, label: "Social Media" },
  { id: 6, label: "SEO" },
  { id: 7, label: "Publish" },
];

// Initial state structure
const getInitialState = () => ({
  // Details
  category: "",
  type: "",
  eventName: "",
  eventUrl: "",
  shortUrl: "",
  excerpt: "",
  description: "",
  whyToAttend: "",
  offlinePaymentInstructions: "",
  currency: "",
  soldOut: false,
  enableReview: false,

  // Timing
  startDate: "",
  startTime: "",
  endDate: "",
  endTime: "",
  isRepetitive: false,
  repetitiveType: "Weekly",
  isSeasonal: false,

  // Location
  isOnline: false,
  venue: "",
  mapUrl: "",
  venueData: null,

  // Media
  poster: null,
  posterPreview: null,
  thumbnail: null,
  thumbnailPreview: null,
  gallery: [],
  galleryPreviews: [],
  seatingChart: null,
  seatingChartPreview: null,
  videoUrl: "",
  videoId: "",
  media: {
    posterImage: null,
    thumbnailImage: null,
    images: [],
    seatingChartImage: null,
  },

  // Performers
  performers: [],
  performersYtLinks: [""],
  performersData: [],

  // Social Media
  performerFacebookLinks: [],
  venueFacebookLinks: [],
  youtubeLinks: [""],

  // Repetitive
  repeatExcept: [],
  repeatDates: [],
  repeatDays: [],
  repeatStartTime: "",
  repeatEndTime: "",

  // SEO
  metaTitle: "",
  metaTags: "",
  metaDescription: "",

  // Publish
  isPublish: false,
  isFeatured: false,
  isEnabled: false,
  tags: [],
});

const DashCreateEvent = ({ eventIdFromRoute = null }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const passedEventData = location.state;
  const { eventId: eventIdFromParams } = useParams();
  const eventId = eventIdFromParams || eventIdFromRoute;
  const token = localStorage.getItem("authToken");

  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Centralized state management
  const [formState, setFormState] = useState(getInitialState());
  const [isInitialized, setIsInitialized] = useState(false);

  const [toast, setToast] = useState(null);
  const [confirmModal, setConfirmModal] = useState({ show: false, message: "" });

  // Confirmation dialog state
  const [confirmationDialog, setConfirmationDialog] = useState({
    isOpen: false,
    title: '',
    message: '',
    confirmText: '',
    cancelText: '',
    type: 'warning',
    onConfirm: null
  });

  // Show confirmation dialog
  const showConfirmation = (title, message, confirmText, cancelText, type, onConfirm) => {
    setConfirmationDialog({
      isOpen: true,
      title,
      message,
      confirmText,
      cancelText,
      type,
      onConfirm: () => {
        onConfirm();
        setConfirmationDialog(prev => ({ ...prev, isOpen: false }));
      }
    });
  };

  // Close confirmation dialog
  const closeConfirmation = () => {
    setConfirmationDialog(prev => ({ ...prev, isOpen: false }));
  };

  // Initialize form state from event data
  const initializeFormState = useCallback((data) => {
    if (!data) return;

    const initialState = getInitialState();

    // Create the initialized state
    const initializedState = {
      ...initialState,
      category: data.category || "",
      type: data.type || "",
      eventName: data.name || "",
      eventUrl: data.eventUrl || "",
      shortUrl: data.shortUrl || "",
      excerpt: data.excerpt || "",
      description: data.description || "",
      whyToAttend: data.whyToAttend || "",
      offlinePaymentInstructions: data.offlinePaymentInstructions || "",
      currency: data.currency || "",
      soldOut: data.disableEventAfterSoldOut || false,
      enableReview: data.enableRatingAndReview || false,

      // Timing
      startDate: data.startDate ? new Date(data.startDate).toISOString().slice(0, 10) : "",
      startTime: data.startDate ? new Date(data.startDate).toTimeString().slice(0, 5) : "",
      endDate: data.endDate ? new Date(data.endDate).toISOString().slice(0, 10) : "",
      endTime: data.endDate ? new Date(data.endDate).toTimeString().slice(0, 5) : "",
      isRepetitive: data.isRepetitive || false,
      repetitiveType: data.repetitiveType === "undefined" || data.repetitiveType === "" ? "Weekly" : (data.repetitiveType || "Weekly"),
      isSeasonal: data.isSeasonal || false,

      // Location
      isOnline: data.isOnline || false,
      venue: data.venue?._id || "",
      mapUrl: data.mapUrl || "",
      // Store full venue object for display purposes
      venueData: data.venue || null,

      // Media
      posterPreview: data.media?.posterImage || null,
      thumbnailPreview: data.media?.thumbnailImage || null,
      videoUrl: data.videoUrl || "",
      videoId: data.videoId || "",
      media: {
        posterImage: data.media?.posterImage || null,
        thumbnailImage: data.media?.thumbnailImage || null,
        images: Array.isArray(data.media?.images) ? data.media.images : [],
        seatingChartImage: data.media?.seatingChartImage || null,
      },

      // Performers
      performers: Array.isArray(data.performers)
        ? data.performers.map(p => typeof p === "string" ? p : p?._id).filter(Boolean)
        : [],
      performersYtLinks: [""],
      // Store full performer objects for display purposes
      performersData: Array.isArray(data.performers)
        ? data.performers.filter(p => typeof p === "object" && p?._id && p?.name)
        : [],

      // Social Media
      performerFacebookLinks: data.performerFacebookUrls || [],
      venueFacebookLinks: data.venueFacebookUrls || [],
      youtubeLinks: data.youtubeVideoUrls || [""],

      // Repetitive
      repeatExcept: Array.isArray(data.repeatExcept) ? data.repeatExcept.filter(item => item !== null && item !== "undefined") : [],
      repeatDates: Array.isArray(data.repeatDates) ? data.repeatDates.filter(item => item !== null && item !== "undefined") : [],
      repeatDays: Array.isArray(data.repeatDays) ? data.repeatDays.filter(item => item !== "" && item !== null && item !== "undefined") : [],
      repeatStartTime: data.repeatStartTime || "",
      repeatEndTime: data.repeatEndTime === "undefined" ? "" : (data.repeatEndTime || ""),

      // SEO
      metaTitle: data.seo?.metaTitle || "",
      metaTags: data.seo?.metaTags || "",
      metaDescription: data.seo?.metaDescription || "",

      // Publish
      isPublish: data.isPublish || false,
      isFeatured: data.isFeatured || false,
      isEnabled: data.isEnabled || false,
      tags: Array.isArray(data.eventTags)
        ? data.eventTags
          .map(tag => typeof tag === 'object' && tag !== null ? tag.name : tag)
          .filter(tag => tag !== null && tag !== undefined && tag !== "undefined")
        : [],
    };

    setFormState(initializedState);
  }, []);

  // Fetch event data for updates
  useEffect(() => {
    const fetchEventData = async () => {
      const eventIdToFetch = eventId || passedEventData?.event?._id;

      if (!eventIdToFetch) {
        setIsInitialized(true);
        return setLoading(false);
      }

      try {
        const res = await axios.get(`${baseUrl}/event/${eventIdToFetch}`, {
          headers: { Authorization: token },
        });
        setEventData(res.data);
        initializeFormState(res.data);
      } catch (err) {
        console.error("Failed to fetch event:", err);
        toast.error("Failed to fetch event data");
      } finally {
        setLoading(false);
        setIsInitialized(true);
      }
    };
    fetchEventData();
  }, [eventId, passedEventData?.event?._id, token, initializeFormState]);

  // Centralized state update function
  const updateFormState = useCallback((updates) => {
    setFormState(prev => ({ ...prev, ...updates }));
  }, []);

  // Tab-specific state getters and setters
  const getDetailsData = () => ({
    category: formState.category,
    type: formState.type,
    eventName: formState.eventName,
    eventUrl: formState.eventUrl,
    shortUrl: formState.shortUrl,
    excerpt: formState.excerpt,
    description: formState.description,
    whyToAttend: formState.whyToAttend,
    offlinePaymentInstructions: formState.offlinePaymentInstructions,
    currency: formState.currency,
    soldOut: formState.soldOut,
    enableReview: formState.enableReview,
  });

  const setDetailsData = (updates) => {
    // Handle both function updates and direct object updates
    if (typeof updates === 'function') {
      setFormState(prev => {
        const currentDetails = {
          category: prev.category,
          type: prev.type,
          eventName: prev.eventName,
          eventUrl: prev.eventUrl,
          shortUrl: prev.shortUrl,
          excerpt: prev.excerpt,
          description: prev.description,
          whyToAttend: prev.whyToAttend,
          offlinePaymentInstructions: prev.offlinePaymentInstructions,
          currency: prev.currency,
          soldOut: prev.soldOut,
          enableReview: prev.enableReview,
        };
        const newDetails = updates(currentDetails);
        return { ...prev, ...newDetails };
      });
    } else {
      updateFormState(updates);
    }
  };

  const getTimingData = () => ({
    startDate: formState.startDate,
    startTime: formState.startTime,
    endDate: formState.endDate,
    endTime: formState.endTime,
    isRepetitive: formState.isRepetitive,
    repetitiveType: formState.repetitiveType,
    isSeasonal: formState.isSeasonal,
  });

  const setTimingData = (updates) => {
    if (typeof updates === 'function') {
      setFormState(prev => {
        const currentTiming = {
          startDate: prev.startDate,
          startTime: prev.startTime,
          endDate: prev.endDate,
          endTime: prev.endTime,
          isRepetitive: prev.isRepetitive,
          repetitiveType: prev.repetitiveType,
          isSeasonal: prev.isSeasonal,
        };
        const newTiming = updates(currentTiming);
        return { ...prev, ...newTiming };
      });
    } else {
      updateFormState(updates);
    }
  };

  const getLocationData = () => ({
    isOnline: formState.isOnline,
    venue: formState.venue,
    mapUrl: formState.mapUrl,
    venueData: formState.venueData,
  });

  const setLocationData = (updates) => {
    if (typeof updates === 'function') {
      setFormState(prev => {
        const currentLocation = {
          isOnline: prev.isOnline,
          venue: prev.venue,
          mapUrl: prev.mapUrl,
          venueData: prev.venueData,
        };
        const newLocation = updates(currentLocation);
        return { ...prev, ...newLocation };
      });
    } else {
      updateFormState(updates);
    }
  };

  const getMediaData = () => ({
    poster: formState.poster,
    posterPreview: formState.posterPreview,
    thumbnail: formState.thumbnail,
    thumbnailPreview: formState.thumbnailPreview,
    gallery: formState.gallery,
    galleryPreviews: formState.galleryPreviews,
    seatingChart: formState.seatingChart,
    seatingChartPreview: formState.seatingChartPreview,
    videoUrl: formState.videoUrl,
    videoId: formState.videoId,
    media: formState.media,
  });

  const setMediaData = (updates) => {
    if (typeof updates === 'function') {
      setFormState(prev => {
        const currentMedia = {
          poster: prev.poster,
          posterPreview: prev.posterPreview,
          thumbnail: prev.thumbnail,
          thumbnailPreview: prev.thumbnailPreview,
          gallery: prev.gallery,
          galleryPreviews: prev.galleryPreviews,
          seatingChart: prev.seatingChart,
          seatingChartPreview: prev.seatingChartPreview,
          videoUrl: prev.videoUrl,
          videoId: prev.videoId,
          media: prev.media,
        };
        const newMedia = updates(currentMedia);
        return { ...prev, ...newMedia };
      });
    } else {
      updateFormState(updates);
    }
  };

  const getPerformersData = () => ({
    performers: formState.performers,
    performersYtLinks: formState.performersYtLinks,
    performersData: formState.performersData,
  });

  const setPerformersData = (updates) => {
    if (typeof updates === 'function') {
      setFormState(prev => {
        const currentPerformers = {
          performers: prev.performers,
          performersYtLinks: prev.performersYtLinks,
          performersData: prev.performersData,
        };
        const newPerformers = updates(currentPerformers);
        return { ...prev, ...newPerformers };
      });
    } else {
      updateFormState(updates);
    }
  };

  const getSocialMediaData = () => ({
    performerFacebookLinks: formState.performerFacebookLinks,
    venueFacebookLinks: formState.venueFacebookLinks,
    youtubeLinks: formState.youtubeLinks,
  });

  const setSocialMediaData = (updates) => {
    if (typeof updates === 'function') {
      setFormState(prev => {
        const currentSocialMedia = {
          performerFacebookLinks: prev.performerFacebookLinks,
          venueFacebookLinks: prev.venueFacebookLinks,
          youtubeLinks: prev.youtubeLinks,
        };
        const newSocialMedia = updates(currentSocialMedia);
        return { ...prev, ...newSocialMedia };
      });
    } else {
      updateFormState(updates);
    }
  };

  const getRepetitiveData = () => ({
    repeatExcept: formState.repeatExcept,
    repeatDates: formState.repeatDates,
    repeatDays: formState.repeatDays,
    repeatStartTime: formState.repeatStartTime,
    repeatEndTime: formState.repeatEndTime,
  });

  const setRepetitiveData = (updates) => {
    if (typeof updates === 'function') {
      setFormState(prev => {
        const currentRepetitive = {
          repeatExcept: prev.repeatExcept,
          repeatDates: prev.repeatDates,
          repeatDays: prev.repeatDays,
          repeatStartTime: prev.repeatStartTime,
          repeatEndTime: prev.repeatEndTime,
        };
        const newRepetitive = updates(currentRepetitive);
        return { ...prev, ...newRepetitive };
      });
    } else {
      updateFormState(updates);
    }
  };

  const getSeoData = () => ({
    metaTitle: formState.metaTitle,
    metaTags: formState.metaTags,
    metaDescription: formState.metaDescription,
  });

  const setSeoData = (updates) => {
    if (typeof updates === 'function') {
      setFormState(prev => {
        const currentSeo = {
          metaTitle: prev.metaTitle,
          metaTags: prev.metaTags,
          metaDescription: prev.metaDescription,
        };
        const newSeo = updates(currentSeo);
        return { ...prev, ...newSeo };
      });
    } else {
      updateFormState(updates);
    }
  };

  const getPublishData = () => ({
    isPublish: formState.isPublish,
    isFeatured: formState.isFeatured,
    isEnabled: formState.isEnabled,
    tags: formState.tags,
  });

  const setPublishData = (updates) => {
    if (typeof updates === 'function') {
      setFormState(prev => {
        const currentPublish = {
          isPublish: prev.isPublish,
          isFeatured: prev.isFeatured,
          isEnabled: prev.isEnabled,
          tags: prev.tags,
        };
        const newPublish = updates(currentPublish);
        return { ...prev, ...newPublish };
      });
    } else {
      updateFormState(updates);
    }
  };

  const nextTab = () => {
    if (selectedTabIndex < tabs.length - 1) {
      setSelectedTabIndex(selectedTabIndex + 1);
    }
  };

  const handleTabSelect = (index) => {
    setSelectedTabIndex(index);
  };

  // Convert form state to FormData
  const convertFormStateToFormData = () => {
    const formData = new FormData();

    // Details
    formData.append("category", formState.category || "");
    formData.append("type", formState.type || "");
    formData.append("name", formState.eventName || "");
    formData.append("eventUrl", formState.eventUrl || "");
    formData.append("shortUrl", formState.shortUrl || "");
    formData.append("excerpt", formState.excerpt || "");
    formData.append("description", formState.description || "");
    formData.append("whyToAttend", formState.whyToAttend || "");
    formData.append("offlinePaymentInstructions", formState.offlinePaymentInstructions || "");
    formData.append("currency", formState.currency || "");
    formData.append("disableEventAfterSoldOut", formState.soldOut || false);
    formData.append("enableRatingAndReview", formState.enableReview || false);

    // Timing
    if (formState.startDate && formState.startTime && formState.startDate.trim() && formState.startTime.trim()) {
      const startDateTime = `${formState.startDate}T${formState.startTime}:00Z`;
      const startDate = new Date(startDateTime);
      if (!isNaN(startDate.getTime())) {
        formData.append("startDate", startDate.toISOString());
      }
    }

    if (formState.endDate && formState.endTime && formState.endDate.trim() && formState.endTime.trim()) {
      const endDateTime = `${formState.endDate}T${formState.endTime}:00Z`;
      const endDate = new Date(endDateTime);
      if (!isNaN(endDate.getTime())) {
        formData.append("endDate", endDate.toISOString());
      }
    }

    // Repetitive settings
    formData.append("isRepetitive", formState.isRepetitive || false);
    formData.append("repetitiveType", formState.repetitiveType || "");
    formData.append("isSeasonal", formState.isSeasonal || false);

    // Location
    formData.append("isOnline", formState.isOnline || false);
    formData.append("venue", formState.venue || "");
    formData.append("mapUrl", formState.mapUrl || "");

    // Media
    if (formState.poster instanceof File) {
      formData.append("posterImage", formState.poster);
    }
    if (Array.isArray(formState.gallery)) {
      formState.gallery.forEach((file) => {
        if (file instanceof File) {
          formData.append("images", file);
        }
      });
    }
    if (formState.seatingChart instanceof File) {
      formData.append("seatingChartImage", formState.seatingChart);
    }
    formData.append("videoUrl", formState.videoUrl || "");
    formData.append("videoId", formState.videoId || "");

    // SEO
    formData.append("seo", JSON.stringify({
      metaTitle: formState.metaTitle || "",
      metaTags: formState.metaTags || "",
      metaDescription: formState.metaDescription || "",
    }));

    // Performers
    if (Array.isArray(formState.performers)) {
      formData.append("performers", formState.performers.join(","));
    }
    if (Array.isArray(formState.performersYtLinks)) {
      formData.append("performersYtLinks", formState.performersYtLinks.join(","));
    }

    // Social Media
    if (Array.isArray(formState.performerFacebookLinks)) {
      formData.append("performerFacebookLinks", formState.performerFacebookLinks.join(","));
    }
    if (Array.isArray(formState.venueFacebookLinks)) {
      formData.append("venueFacebookLinks", formState.venueFacebookLinks.join(","));
    }
    if (Array.isArray(formState.youtubeLinks)) {
      formData.append("youtubeLinks", formState.youtubeLinks.join(","));
    }

    // Repetitive settings
    if (Array.isArray(formState.repeatExcept)) {
      formData.append("repeatExcept", formState.repeatExcept.join(","));
    }
    if (Array.isArray(formState.repeatDates)) {
      formData.append("repeatDates", formState.repeatDates.join(","));
    }
    if (Array.isArray(formState.repeatDays)) {
      formData.append("repeatDays", formState.repeatDays.join(","));
    }
    formData.append("repeatStartTime", formState.repeatStartTime || "");
    formData.append("repeatEndTime", formState.repeatEndTime || "");

    // Tags
    if (Array.isArray(formState.tags)) {
      formData.append("eventTags", formState.tags.join(","));
    }

    // Publish settings
    formData.append("isPublish", formState.isPublish || false);
    formData.append("isFeatured", formState.isFeatured || false);
    formData.append("isEnabled", formState.isEnabled || false);

    return formData;
  };

  // Save event handler
  const handleSaveEvent = async () => {
    console.log("Current form state:", formState);
    const formData = convertFormStateToFormData();

    try {
      const resolvedEventId = passedEventData?.event?._id || eventId;
      if (resolvedEventId) {
        await dispatch(updateEvent(resolvedEventId, formData));
        navigate('/admin-panel?section=events');
      } else {
        await dispatch(createNewEvent(formData));
        navigate('/admin-panel?section=events');
      }
    } catch (error) {
      console.error("Error saving event:", error);
    }
  };

  // Determine if we're in edit mode
  const isEditMode = passedEventData?.event?._id || eventId || eventData;

  if (!isInitialized) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <ConfirmationDialog
        isOpen={confirmationDialog.isOpen}
        onClose={closeConfirmation}
        onConfirm={confirmationDialog.onConfirm}
        title={confirmationDialog.title}
        message={confirmationDialog.message}
        confirmText={confirmationDialog.confirmText}
        cancelText={confirmationDialog.cancelText}
        type={confirmationDialog.type}
      />

      <div className="p-4 md:p-6 bg-white rounded-lg shadow-md max-w-8xl mx-auto min-h-[calc(100vh-2rem)] md:min-h-[calc(100vh-3rem)] lg:min-h-screen">
        <div className="flex items-center mb-6">
          <button
            onClick={() => showConfirmation(
              'Leave Event Creation',
              'Are you sure you want to go back? Any unsaved changes will be lost.',
              'Leave',
              'Stay',
              'warning',
              () => navigate('/admin-panel?section=events')
            )}
            className="flex items-center text-gray-600 hover:text-gray-800 transition-colors mr-4"
          >
            <FaArrowLeft className="mr-2" />
            Back to Admin Panel
          </button>
          <h2 className="text-2xl font-bold">{isEditMode ? "Update Event" : "Create Event"}</h2>
        </div>

        {!loading && (
          <Tabs
            selectedIndex={selectedTabIndex}
            onSelect={handleTabSelect}
            className="react-tabs"
          >
            <TabList>
              {tabs.map((tab) => (
                <Tab key={tab.id}>
                  {tab.label}
                </Tab>
              ))}
            </TabList>

            <TabPanel key="details" forceRender={true}>
              <Details
                data={getDetailsData()}
                setData={setDetailsData}
                nextTab={nextTab}
              />
            </TabPanel>

            <TabPanel key="timings" forceRender={true}>
              <Timings
                data={getTimingData()}
                setData={setTimingData}
                nextTab={nextTab}
                repetitiveData={getRepetitiveData()}
                setRepetitiveData={setRepetitiveData}
              />
            </TabPanel>

            <TabPanel key="location" forceRender={true}>
              <Location
                data={getLocationData()}
                setData={setLocationData}
                nextTab={nextTab}
              />
            </TabPanel>

            <TabPanel key="media" forceRender={true}>
              <Media
                data={getMediaData()}
                setData={setMediaData}
                nextTab={nextTab}
              />
            </TabPanel>

            <TabPanel key="performers" forceRender={true}>
              <Performers
                data={getPerformersData()}
                setData={setPerformersData}
                nextTab={nextTab}
              />
            </TabPanel>

            <TabPanel key="social-media" forceRender={true}>
              <SocialMedia
                data={getSocialMediaData()}
                setData={setSocialMediaData}
                nextTab={nextTab}
              />
            </TabPanel>

            <TabPanel key="seo" forceRender={true}>
              <SEO
                data={getSeoData()}
                setData={setSeoData}
                nextTab={nextTab}
              />
            </TabPanel>

            <TabPanel key="publish" forceRender={true}>
              <Publish
                data={getPublishData()}
                setData={setPublishData}
                onSave={handleSaveEvent}
              />
            </TabPanel>
          </Tabs>
        )}
      </div>
    </>
  );
};

export default DashCreateEvent;
