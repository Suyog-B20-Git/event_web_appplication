import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const Media = ({ data, setData, nextTab }) => {

  const handlePosterChange = (e) => {
    const file = e.target.files[0];
    setData((prev) => ({
      ...prev,
      poster: file,
      posterPreview: URL.createObjectURL(file),
    }));
  };

  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files);
    setData((prev) => ({
      ...prev,
      gallery: files,
      galleryPreviews: files.map((f) => URL.createObjectURL(f)),
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
      }));
    }
  };



  return (
    <form className="space-y-6">
      {/* Poster Image */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Upload Poster Image {data.thumbnailPreview && !data.posterPreview && "(showing thumbnail)"}
        </label>
        <input
          type="file"
          accept="image/*"
          className="block w-full border border-gray-300 rounded-2xl px-3 py-2 text-gray-500 hover:border-blue-500"
          onChange={handlePosterChange}
        />
        {(data.posterPreview || data.thumbnailPreview) && (
          <img
            src={data.posterPreview || data.thumbnailPreview}
            alt="Poster"
            className="w-36 h-24 object-cover rounded-2xl mt-2"
          />
        )}
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
          {data.galleryPreviews?.map((img, i) => (
            <img
              key={i}
              src={img}
              className="w-36 h-24 object-cover rounded-2xl"
              alt="Gallery"
            />
          ))}
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
        /> */}

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
          SeatingChart Image
        </label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleSeatingChartChange}
          className="block w-full border border-gray-300 rounded-2xl px-3 py-2 text-gray-500 hover:border-blue-500"
        />
        <div className="flex gap-4 mt-4 flex-wrap">
          {data.seatingChartPreview && (
            <img
              src={data.seatingChartPreview}
              alt="Seating"
              className="w-36 h-24 object-cover rounded-2xl"
            />
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
