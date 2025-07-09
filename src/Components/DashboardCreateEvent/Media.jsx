// Components/DashboardCreateEvent/Media.jsx

import React, { useState } from "react";

const Media = ({ nextTab }) => {
  const [poster, setPoster] = useState(null);
  const [gallery, setGallery] = useState([]);

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
          onChange={(e) => setPoster(URL.createObjectURL(e.target.files[0]))}
          className="block w-full border border-gray-300 rounded-2xl px-3 py-2 text-gray-500  hover:border-blue-500"
        />
        {poster && (
          <img
            src={poster}
            alt="Poster"
            className="mt-3 w-48 h-32 object-cover rounded-2xl"
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
          multiple
          accept="image/*"
          onChange={(e) =>
            setGallery(
              Array.from(e.target.files).map((file) =>
                URL.createObjectURL(file)
              )
            )
          }
          className="block w-full border border-gray-300 rounded-2xl px-3 py-2  text-gray-500  hover:border-blue-500"
        />
        <div className="flex gap-4 mt-4 flex-wrap">
          {gallery.map((img, i) => (
            <img
              key={i}
              src={img}
              alt="Gallery"
              className="w-36 h-24 object-cover rounded-2xl"
            />
          ))}
        </div>
      </div>

      {/* Youtube video, YoutubeLink , Seating Chart Image image */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          YouTube Video URL (optional)
        </label>
        <input
          type="text"
          placeholder="YouTube / Promo Video URL"
          className="w-full border border-gray-300 rounded-2xl px-4 py-2 text-gray-600 hover:border-blue-500"
        />
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Enter Video ID Only
        </label>
        <input
          type="text"
          placeholder="https://www.youtube.com/watch?"
          className="w-full border border-gray-300 rounded-2xl px-4 py-2 text-gray-600 hover:border-blue-500"
        />
        <label className="block text-sm font-medium text-gray-700 mb-1">
          SeatingChart Image
        </label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) =>
            setGallery(
              Array.from(e.target.files).map((file) =>
                URL.createObjectURL(file)
              )
            )
          }
          className="block w-full border border-gray-300 rounded-2xl px-3 py-2  text-gray-500  hover:border-blue-500"
        />
      </div>

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
