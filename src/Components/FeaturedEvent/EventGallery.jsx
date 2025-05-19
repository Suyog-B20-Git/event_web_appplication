import React, { useState, useRef, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

function EventGallery({ data }) {
  const [viewerOpen, setViewerOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const viewerRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const openViewer = (index) => {
    setCurrentIndex(index);
    setViewerOpen(true);
  };

  const closeViewer = () => {
    setViewerOpen(false);
    setFullscreen(false);
  };

  const goNext = () => {
    setCurrentIndex((prev) => (prev + 1) % data.length);
  };

  const goPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + data.length) % data.length);
  };

  const toggleFullscreen = () => {
    setFullscreen(!fullscreen);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].clientX;
    handleSwipe();
  };

  const handleSwipe = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goNext(); // swipe left
      else goPrev(); // swipe right
    }
  };

  useEffect(() => {
    document.body.style.overflow = viewerOpen ? "hidden" : "auto";
  }, [viewerOpen]);

  return (
    <div className="w-full px-2">
      {data?.length > 0 && (
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 lg:gap-12 gap-5">
            {data.map((item, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-xl shadow-md cursor-pointer transition-transform transform hover:scale-105"
                onClick={() => openViewer(index)}
              >
                <img
                  src={item}
                  alt={`event-${index}`}
                  className="w-full h-[180px] sm:h-[200px] lg:h-[220px] object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition duration-300 rounded-xl" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Fullscreen Viewer */}
      {viewerOpen && (
        <div
          ref={viewerRef}
          className={`fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center ${
            fullscreen ? "p-0" : "p-4"
          } transition-opacity duration-300 ease-in-out`}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <button
            onClick={closeViewer}
            className="absolute top-4 right-4 text-white p-2"
          >
            <X size={28} />
          </button>

          <button
            onClick={goPrev}
            className="absolute left-4 text-white p-2"
          >
            <ChevronLeft size={32} />
          </button>

          <img
            src={data[currentIndex]}
            alt={`view-${currentIndex}`}
            className={`transition-all duration-300 max-h-full max-w-full ${
              fullscreen
                ? "w-screen h-screen object-contain"
                : "rounded-xl hover:scale-105 scale-95"
            }`}
          />

          <button
            onClick={goNext}
            className="absolute right-4 text-white p-2"
          >
            <ChevronRight size={32} />
          </button>

          <button
            onClick={toggleFullscreen}
            className="absolute bottom-4 right-4 text-white p-2"
          >
            <Maximize2 size={24} />
          </button>
        </div>
      )}
    </div>
  );
}

export default EventGallery;
