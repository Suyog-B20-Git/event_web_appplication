// import React, { useState } from "react";
// import { LuUserRound } from "react-icons/lu";

// function Media() {
//   const [data, setData] = useState([]);
//   const [newData, setNewData] = useState({
//     thumbnail: "",
//     poster: "",
//     img: "",
//   });
//   // Handle file selection or drop
//   const [isDragging, setIsDragging] = useState(false);
//   const [selectedImage, setSelectedImage] = useState(null);

//   const handleImageUpload = (file) => {
//     if (!file.type.startsWith("image/")) {
//       alert("Please upload a valid image.");
//       return;
//     }
//     const blobUrl = URL.createObjectURL(file);
//     setSelectedImage(blobUrl);
//     setNewData({ ...newData, poster: blobUrl });
//   };

//   const handleDragOver = (e) => {
//     e.preventDefault();
//     setIsDragging(true);
//   };

//   const handleDragLeave = () => {
//     setIsDragging(false);
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     setIsDragging(false);
//     const file = e.dataTransfer.files[0];

//     if (file) {
//       handleImageUpload(file);
//     }
//   };

//   const handleClick = () => {
//     document.getElementById("hiddenFileInput").click();
//   };
//   return (
//     <div>
//       <div className="flex gap-3 justify-center items-center pb-8">
//         <div className="rounded-full flex justify-center items-center text-7xl h-24 w-24 border-2 border-dashed border-gray-500">
//           {selectedImage ? (
//             <img src={selectedImage} className="w-24 h-24 rounded-full" />
//           ) : (
//             <LuUserRound />
//           )}
//         </div>
//         <div className="flex flex-col gap-2 text-sm justify-center">
//           <div
//             className={`drop-zone ${isDragging ? "dragging" : ""}`}
//             onDragOver={handleDragOver}
//             onDragLeave={handleDragLeave}
//             onDrop={handleDrop}
//           >
//             <input
//               type="file"
//               id="hiddenFileInput"
//               accept="image/*"
//               style={{ display: "none" }}
//               onChange={(e) => handleImageUpload(e.target.files[0])}
//             />
//           </div>
//           <label htmlFor="fileInput" style={{ cursor: "pointer" }}>
//             <center>Drag image here</center>
//             <center>or</center>
//             <center onClick={handleClick} className="text-blue-500 underline">
//               Browse image
//             </center>
//           </label>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Media;

import React, { useState } from "react";
import { LuUserRound } from "react-icons/lu";
import { MdSimCardDownload } from "react-icons/md";

function Media() {
  const [data, setData] = useState([]);
  const [newData, setNewData] = useState({
    thumbnail: "",
    poster: "",
    img: "",
    img1: "",
    youtubeUrl: "",
  });
  const [fileName, setFileName] = useState("");
  const [fileName1, setFileName1] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      setNewData({ ...newData, img: file }); // Store file in `newData.img`
    } else {
      setFileName("");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewData({ ...newData, [name]: value });
  };
  const handleFileChange1 = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName1(file.name);
      setNewData({ ...newData, img1: file }); // Store file in `newData.img`
    } else {
      setFileName1("");
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    setData([...data, newData]);
    setNewData({
      thumbnail: "",
      poster: "",
      img: "",
      img1: "",
      youtubeUrl: "",
    });
  };
  const [isDraggingThumbnail, setIsDraggingThumbnail] = useState(false);
  const [isDraggingPoster, setIsDraggingPoster] = useState(false);

  const handleImageUpload = (file, type) => {
    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image.");
      return;
    }
    const blobUrl = URL.createObjectURL(file);

    setNewData((prev) => ({
      ...prev,
      [type]: blobUrl,
    }));
  };

  const handleDragOver = (e, type) => {
    e.preventDefault();
    if (type === "thumbnail") setIsDraggingThumbnail(true);
    if (type === "poster") setIsDraggingPoster(true);
  };

  const handleDragLeave = (type) => {
    if (type === "thumbnail") setIsDraggingThumbnail(false);
    if (type === "poster") setIsDraggingPoster(false);
  };

  const handleDrop = (e, type) => {
    e.preventDefault();
    if (type === "thumbnail") setIsDraggingThumbnail(false);
    if (type === "poster") setIsDraggingPoster(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      handleImageUpload(file, type);
    }
  };

  const handleClick = (type) => {
    document.getElementById(`${type}FileInput`).click();
  };

  return (
    <div className="flex flex-col gap-10">
      {/* Thumbnail Section */}
      <div className="flex gap-3  items-center pb-8">
        <div className=" flex justify-center items-center text-7xl w-[500px] h-[300px] border">
          {newData.thumbnail ? (
            <img src={newData.thumbnail} className="w-[500px] h-[300px] " />
          ) : (
            <p className="bg-gray-200 w-full h-full"></p>
          )}
        </div>
        <div className="flex flex-col gap-2 text-sm justify-center">
          <div
            className={`drop-zone ${isDraggingThumbnail ? "dragging" : ""}`}
            onDragOver={(e) => handleDragOver(e, "thumbnail")}
            onDragLeave={() => handleDragLeave("thumbnail")}
            onDrop={(e) => handleDrop(e, "thumbnail")}
          >
            <input
              type="file"
              id="thumbnailFileInput"
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) =>
                handleImageUpload(e.target.files[0], "thumbnail")
              }
            />
          </div>
          <label htmlFor="thumbnailFileInput" style={{ cursor: "pointer" }}>
            <center>Drag Thumbnail here</center>
            <center>or</center>
            <center
              onClick={() => handleClick("thumbnail")}
              className="text-blue-500 underline"
            >
              Browse Thumbnail
            </center>
          </label>
        </div>
      </div>

      {/* Poster Section */}
      <div className="flex gap-3 items-center pb-8">
        <div className="flex justify-center items-center text-7xl w-[500px] h-[300px] border">
          {newData.poster ? (
            <img src={newData.poster} className="w-[500px] h-[300px] " />
          ) : (
            <p className="bg-gray-200 w-full h-full"></p>
          )}
        </div>
        <div className="flex flex-col gap-2 text-sm justify-center">
          <div
            className={`drop-zone ${isDraggingPoster ? "dragging" : ""}`}
            onDragOver={(e) => handleDragOver(e, "poster")}
            onDragLeave={() => handleDragLeave("poster")}
            onDrop={(e) => handleDrop(e, "poster")}
          >
            <input
              type="file"
              id="posterFileInput"
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) => handleImageUpload(e.target.files[0], "poster")}
            />
          </div>
          <label htmlFor="posterFileInput" style={{ cursor: "pointer" }}>
            <center>Drag Poster here</center>
            <center>or</center>
            <center
              onClick={() => handleClick("poster")}
              className="text-blue-500 underline"
            >
              Browse Poster
            </center>
          </label>
        </div>
      </div>

      <div className="flex flex-col items-start space-y-2 w-full pt-2">
        <label className="font-semibold">Images Gallery*</label>
        <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 w-full focus-within:ring-2 focus-within:ring-blue-500">
          <input
            type="file"
            onChange={handleFileChange}
            multiple
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="flex-grow text-sm text-gray-500 truncate cursor-pointer"
          >
            {fileName || "Choose Files"}
          </label>
          <button
            className="ml-4 text-blue-500 hover:underline focus:outline-none"
            onClick={() => document.getElementById("file-upload").click()}
          >
            Browse
          </button>
        </div>
        <p className="text-sm text-gray-400">
          Upload images related to your event
        </p>
      </div>
      <div className="">
        <label
          htmlFor="youtube url"
          className="block text-gray-600 font-medium mb-1"
        >
          Youtube url
        </label>
        <input
          type="url"
          required
          className="lg:w-full w-[90%] mb-2 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={newData.youtubeUrl}
          name="youtubeUrl"
          onChange={handleChange}
          min="2"
          max="300"
        />
      </div>

      <div className="flex flex-col items-start space-y-2 w-full pt-2">
        <label className="font-semibold">Seating Arrangement Image</label>
        <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 w-full focus-within:ring-2 focus-within:ring-blue-500">
          <input
            type="file"
            onChange={handleFileChange1}
            multiple
            className="hidden"
            id="file-upload1"
          />
          <label
            htmlFor="file-upload1"
            className="flex-grow text-sm text-gray-500 truncate cursor-pointer"
          >
            {fileName1 || "Choose Files"}
          </label>
          <button
            className="ml-4 text-blue-500 hover:underline focus:outline-none"
            onClick={() => document.getElementById("file-upload1").click()}
          >
            Browse
          </button>
        </div>
      </div>

      <button
        type="submit"
        onClick={(e) => handleSubmit(e)}
        className="bg-blue-500 gap-2 mt-3  text-xl flex  w-[max-content] text-white py-2 px-2 rounded-md hover:bg-blue-600 transition duration-300"
      >
        <MdSimCardDownload className="relative top-1 " />
        Save
      </button>
    </div>
  );
}

export default Media;
