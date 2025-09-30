import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPerformerById } from "../../redux/actions/master/Performers/getPerformerById";
import { useNavigate } from "react-router-dom";

const PerformersSection = ({ performerIds }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const scrollContainerRef = useRef(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(false);

  const performerData = useSelector(
    (state) => state.getPerformerByIdReducer.performerData
  );

  const [loadedPerformers, setLoadedPerformers] = useState({});

  useEffect(() => {
    if (performerData && performerData._id) {
      setLoadedPerformers((prev) => ({
        ...prev,
        [performerData._id]: performerData,
      }));
    }
  }, [performerData]);

  useEffect(() => {
    if (performerIds && performerIds.length > 0) {
      performerIds.forEach((id, index) => {
        // Ensure we have a valid string ID for the API call
        const performerId = typeof id === 'string' ? id : (id?._id || id?.id);
        if (performerId) {
          setTimeout(() => {
            dispatch(getPerformerById(performerId));
          }, index * 500);
        }
      });
    }
  }, [dispatch, performerIds]);

  useEffect(() => {
    const checkScrollButtons = () => {
      if (!scrollContainerRef.current) return;

      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setShowLeftButton(scrollLeft > 0);

      setShowRightButton(scrollLeft + clientWidth < scrollWidth - 10);
    };
    checkScrollButtons();

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScrollButtons);

      const checkAfterLoad = setTimeout(checkScrollButtons, 1000);

      return () => {
        container.removeEventListener("scroll", checkScrollButtons);
        clearTimeout(checkAfterLoad);
      };
    }
  }, [loadedPerformers]);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const formatLocation = (performer) => {
    if (!performer) return "";
    const parts = [];
    if (performer.city) parts.push(performer.city);
    if (performer.state) parts.push(performer.state);
    if (performer.country) parts.push(performer.country);
    return parts.length > 0 ? parts.join(", ") : "No location available";
  };

  return (
    <div className="px-0 p-0 sm:px-6 mt-5 sm:mb-0">
      <div className="relative">
        {showLeftButton && (
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow-md border border-gray-200 md:flex hidden"
            style={{ marginLeft: "-12px" }}
            aria-label="Scroll left"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        )}

        {showRightButton && (
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow-md border border-gray-200 md:flex hidden"
            style={{ marginRight: "-12px" }}
            aria-label="Scroll right"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        )}

        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto py-4 px-2 gap-4 hide-scrollbar touch-pan-x"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {performerIds && performerIds.length > 0 ? (
            performerIds.map((id, index) => {
              // Ensure we have a valid string ID for the key and navigation
              const performerId = typeof id === 'string' ? id : (id?._id || id?.id || `performer-${index}`);
              const performer = loadedPerformers[performerId];

              return performer ? (
                <div
                  key={performerId}
                  onClick={() => navigate(`/Performer/${performerId}`)}
                  className="cursor-pointer border rounded-xl p-4 shadow hover:shadow-lg hover:shadow-red-300 hover:border-red-400 transition duration-300 transform hover:-translate-y-1 flex-shrink-0"
                  style={{ width: "270px", maxWidth: "calc(100vw - 40px)" }}
                >
                  <img
                    src={performer.profileImage || "/placeholder.jpg"}
                    alt={performer.name || "Performer"}
                    className="w-full h-48 object-cover rounded-lg mb-3"
                    loading="lazy"
                  />
                  <h3 className="text-xl font-medium">
                    {performer.name || "Unknown Performer"}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {formatLocation(performer)}
                  </p>
                  {performer.description && (
                    <p className="text-gray-700 mt-2 text-sm line-clamp-2">
                      {performer.description}
                    </p>
                  )}
                </div>
              ) : (
                <div
                  key={performerId}
                  className="border rounded-xl p-4 bg-gray-100 text-center text-gray-500 flex-shrink-0"
                  style={{ width: "270px", maxWidth: "calc(100vw - 40px)" }}
                >
                  <div className="animate-pulse flex flex-col items-center">
                    <div className="w-full h-48 bg-gray-300 rounded-lg mb-3"></div>
                    <div className="h-5 bg-gray-300 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                  </div>
                  <p className="mt-3">Loading...</p>
                </div>
              );
            })
          ) : (
            <div className="text-center py-8 w-full">
              <p className="text-gray-600">No performers to display</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const style = document.createElement("style");
style.textContent = `
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
`;
document.head.appendChild(style);

export default PerformersSection;
