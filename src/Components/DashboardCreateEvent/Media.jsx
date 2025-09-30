import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const Media = ({ data, setData, nextTab }) => {

  const handlePosterChange = (e) => {
    const file = e.target.files[0];
    setData((prev) => ({
      ...prev,
      poster: file,
      posterPreview: URL.createObjectURL(file),
      media: {
        ...prev.media,
        posterImage: URL.createObjectURL(file), // For preview purposes
      },
    }));
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    setData((prev) => ({
      ...prev,
      thumbnail: file,
      thumbnailPreview: URL.createObjectURL(file),
      media: {
        ...prev.media,
        thumbnailImage: URL.createObjectURL(file), // For preview purposes
      },
    }));
  };

  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files);
    const newPreviews = files.map((f) => URL.createObjectURL(f));

    setData((prev) => ({
      ...prev,
      gallery: files,
      galleryPreviews: newPreviews,
      // Add new images to the media.images array for proper state management
      media: {
        ...prev.media,
        images: [
          ...(prev.media?.images || []),
          ...newPreviews, // Add preview URLs to existing images
        ],
      },
    }));
  };

  const handleVideoUrlChange = (e) => {
    setData((prev) => ({
      ...prev,
      videoUrl: e.target.value,
    }));
  };

  const handleVideoIdChange = (e) => {
    setData((prev) => ({
      ...prev,
      videoId: e.target.value,
    }));
  };

  const handleSeatingChartChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setData((prev) => ({
        ...prev,
        seatingChart: file,
        seatingChartPreview: URL.createObjectURL(file),
        media: {
          ...prev.media,
          seatingChartImage: URL.createObjectURL(file), // For preview purposes
        },
      }));
    }
  };

  // Remove functions for different image types
  const removePoster = () => {
    setData((prev) => ({
      ...prev,
      poster: null,
      posterPreview: null,
      media: {
        ...prev.media,
        posterImage: null,
      },
    }));
  };

  const removeThumbnail = () => {
    setData((prev) => ({
      ...prev,
      thumbnail: null,
      thumbnailPreview: null,
      media: {
        ...prev.media,
        thumbnailImage: null,
      },
    }));
  };

  const removeGalleryImage = (index) => {
    setData((prev) => {
      const newGallery = prev.gallery ? prev.gallery.filter((_, i) => i !== index) : [];
      const newGalleryPreviews = prev.galleryPreviews ? prev.galleryPreviews.filter((_, i) => i !== index) : [];

      // Calculate the actual index in the combined images array
      const existingImagesCount = prev.media?.images?.length || 0;
      const actualIndex = existingImagesCount + index;

      return {
        ...prev,
        gallery: newGallery,
        galleryPreviews: newGalleryPreviews,
        media: {
          ...prev.media,
          images: prev.media?.images?.filter((_, i) => i !== actualIndex) || [],
        },
      };
    });
  };

  const removeSeatingChart = () => {
    setData((prev) => ({
      ...prev,
      seatingChart: null,
      seatingChartPreview: null,
      media: {
        ...prev.media,
        seatingChartImage: null,
      },
    }));
  };

  // Helper function to render image preview with remove button
  const renderImagePreview = (src, alt, onRemove, size = "w-36 h-24") => {
    if (!src) return null;

    return (
      <div className="relative inline-block">
        <img
          src={src}
          alt={alt}
          className={`${size} object-cover rounded-2xl`}
        />
        <button
          type="button"
          onClick={onRemove}
          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold hover:bg-red-600 transition-colors"
          title="Remove image"
        >
          ×
        </button>
      </div>
    );
  };



  return (
    <form className="space-y-6">
      {/* Poster Image */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Upload Poster Image
        </label>
        <input
          type="file"
          accept="image/*"
          className="block w-full border border-gray-300 rounded-2xl px-3 py-2 text-gray-500 hover:border-blue-500"
          onChange={handlePosterChange}
        />
        <div className="mt-2">
          {renderImagePreview(
            data.posterPreview || data.media?.posterImage,
            "Poster",
            removePoster
          )}
        </div>
      </div>

      {/* Thumbnail Image */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Upload Thumbnail Image
        </label>
        <input
          type="file"
          accept="image/*"
          className="block w-full border border-gray-300 rounded-2xl px-3 py-2 text-gray-500 hover:border-blue-500"
          onChange={handleThumbnailChange}
        />
        <div className="mt-2">
          {renderImagePreview(
            data.thumbnailPreview || data.media?.thumbnailImage,
            "Thumbnail",
            removeThumbnail
          )}
        </div>
      </div>

      {/* Gallery Images */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Images Gallery
        </label>
        <input
          type="file"
          accept="image/*"
          className="block w-full border border-gray-300 rounded-2xl px-3 py-2 text-gray-500 hover:border-blue-500"
          multiple
          onChange={handleGalleryChange}
        />

        <div className="flex gap-4 mt-4 flex-wrap">
          {/* Show existing gallery images from API */}
          {data.media?.images && data.media.images.length > 0 && (
            <>
              <div className="w-full mb-2">
                <p className="text-sm text-gray-600 font-medium">Existing Gallery Images:</p>
              </div>
              {data.media.images.map((img, i) => (
                <div key={`existing-${i}`} className="relative inline-block">
                  <img
                    src={img}
                    className="w-36 h-24 object-cover rounded-2xl"
                    alt={`Gallery ${i + 1}`}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setData(prev => ({
                        ...prev,
                        media: {
                          ...prev.media,
                          images: prev.media?.images?.filter((_, index) => index !== i) || []
                        }
                      }));
                    }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold hover:bg-red-600 transition-colors"
                    title="Remove image"
                  >
                    ×
                  </button>
                </div>
              ))}
            </>
          )}

          {/* Show new gallery images */}
          {data.galleryPreviews && data.galleryPreviews.length > 0 && (
            <>
              <div className="w-full mb-2">
                <p className="text-sm text-gray-600 font-medium">New Gallery Images:</p>
              </div>
              {data.galleryPreviews.map((img, i) => (
                <div key={`new-${i}`} className="relative inline-block">
                  <img
                    src={img}
                    className="w-36 h-24 object-cover rounded-2xl"
                    alt={`Gallery ${i + 1}`}
                  />
                  <button
                    type="button"
                    onClick={() => removeGalleryImage(i)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold hover:bg-red-600 transition-colors"
                    title="Remove image"
                  >
                    ×
                  </button>
                </div>
              ))}
            </>
          )}

          {/* Show message when no images */}
          {(!data.media?.images || data.media.images.length === 0) &&
            (!data.galleryPreviews || data.galleryPreviews.length === 0) && (
              <div className="w-full text-center py-4">
                <p className="text-gray-500 text-sm">No gallery images uploaded yet</p>
              </div>
            )}
        </div>
      </div>

      {/* YouTube Video */}
      <div className="space-y-3">
        {/* <label className="block text-sm font-medium text-gray-700 mb-1">
          YouTube Video URL (optional)
        </label>
        <input
          type="text"
          placeholder="YouTube / Promo Video URL"
          value={data.videoUrl || ""}
          onChange={handleVideoUrlChange}
          className="w-full border border-gray-300 rounded-2xl px-4 py-2 text-gray-600 hover:border-blue-500"
        />

        {/* <label className="block text-sm font-medium text-gray-700 mb-1">
          Enter Video ID Only
        </label>
        <input
          type="text"
          placeholder="e.g. dQw4w9WgXcQ"
          value={data.videoId || ""}
          onChange={handleVideoIdChange}
          className="w-full border border-gray-300 rounded-2xl px-4 py-2 text-gray-600 hover:border-blue-500"
        />*/}
      </div>

      {/* Seating Chart Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Seating Chart Image
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleSeatingChartChange}
          className="block w-full border border-gray-300 rounded-2xl px-3 py-2 text-gray-500 hover:border-blue-500"
        />
        <div className="mt-2">
          {renderImagePreview(
            data.seatingChartPreview || data.media?.seatingChartImage,
            "Seating Chart",
            removeSeatingChart
          )}
          {!data.seatingChartPreview && !data.media?.seatingChartImage && (
            <p className="text-gray-500 text-sm mt-2">No seating chart image uploaded yet</p>
          )}
        </div>
      </div>

      {/* NEXT Button */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={nextTab}
          className="bg-[#ff2459] text-white px-6 py-2 rounded-2xl-lg"
        >
          Next
        </button>
      </div>
    </form>
  );
};

export default Media;
