import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrganizer } from "../../redux/actions/master/Organizer/getOrganiser";
import Loading from "../Loading";
import { useLocation, useNavigate } from "react-router-dom";
import { FcLike } from "react-icons/fc";
import { CiFacebook } from "react-icons/ci";
import {
  FaFacebookMessenger,
  FaHeart,
  FaInstagram,
  FaShareNodes,
  FaSquareFacebook,
  FaSquareXTwitter,
  FaWhatsapp,
} from "react-icons/fa6";
import Select from "react-select";
import { getPerformer } from "../../redux/actions/master/Performers/getPerformers";
import { IoLogoWhatsapp, IoStarSharp } from "react-icons/io5";
import { BsCalendar2DateFill } from "react-icons/bs";
import { HiOutlineCalendarDateRange } from "react-icons/hi2";
import { CalendarCheck } from "lucide-react";
import { FaShareAlt } from "react-icons/fa";
import Pagination from "../Pagination";
import { getFavouritePerformerData } from "../../redux/actions/master/Performers/getFavouritePerformer";
import { toast, Zoom } from "react-toastify";
import { postFavouritePerformer } from "../../redux/actions/master/Performers/postFavouritePerformer";
import { deleteFavouritePerformer } from "../../redux/actions/master/Performers/deleteFavouritePerformer";

function GetPerformers() {
  const navigate = useNavigate();
  const location = useLocation();
  const value = location.state;
  const [localIsFavorite, setLocalIsFavorite] = useState("isFavourite");
  const filterValue = value ? value.toLowerCase() : "";
  {
    /*header*/
  }
  const [category, setCategory] = useState("");
  const options = [
    { value: "alphabetical", label: "Alphabetical" },
    { value: "title asc", label: "Title ascending" },
    { value: "title desc", label: "Title descending" },
  ];
  const [selectedOption, setSelectedOption] = useState("");

  const customStyles = {
    control: (base) => ({
      ...base,

      borderRadius: "8px",
    }),
    option: (base, { isFocused, isSelected }) => ({
      ...base,
      backgroundColor: isSelected ? "#3498db" : isFocused ? "#85c1e9" : "white",
      color: isSelected ? "white" : "black",
      padding: "10px",
    }),
    menu: (base) => ({
      ...base,
      borderRadius: "8px",

      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
    }),
  };
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const category1 = "";
  useEffect(() => {
    if (category1) {
      dispatch(
        getPerformer(
          setLoading,
          selectedOption?.value || "",
          currentPage,
          category1
        )
      ).finally(() => {});
    } else {
      dispatch(
        getPerformer(
          setLoading,
          selectedOption?.value || "",
          currentPage,
          category ? category : filterValue
        )
      ).finally(() => {});
    }
  }, [dispatch, selectedOption, currentPage, category, category1, filterValue]);

  const store = useSelector((state) => state.getPerformerReducer) || {
    performerData: [],
  };

  const data1 = store.performerData;
  const data = [...new Set(data1)];
  const totalPages = store.totalPages;

  const { favouritePerformerData = [] } = useSelector(
    (state) => state.getFavoritePerformerReducer
  );

  const isLogin = JSON.parse(localStorage.getItem("isLogin"));

  const isFavouritePerformer = (id) => {
    return favouritePerformerData.some((fav) => fav._id === id);
  };

  useEffect(() => {}, [favouritePerformerData]);

  const toggleFavorite = async (id) => {
    setLoading(true);

    if (isFavouritePerformer(id)) {
      await dispatch(deleteFavouritePerformer(id));
      await dispatch(getFavouritePerformerData(() => setLoading(false)));
    } else {
      await dispatch(postFavouritePerformer(id));
      await dispatch(getFavouritePerformerData(() => setLoading(false)));
    }
  };

  useEffect(() => {
    dispatch(getFavouritePerformerData(setLoading));
  }, [dispatch]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const currentUrl = window.location.href;
  const shareUrls = {
    whatsapp: `https://api.whatsapp.com/send?text=${currentUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${currentUrl}`,
    messenger: `https://www.messenger.com/t/?link=${currentUrl}`,
  };
  const handleShare = (platform) => {
    window.open(shareUrls[platform], "_blank");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="flex lg:flex-row flex-col gap-2 lg:pt-0 md:pt-0 pt-20">
      <div className="p-2 lg:w-[75%] w-full">
        <div className="flex justify-between pt-5 border-b pb-2">
          <h1 className="font-bold text-3xl text-[#ff2459] lg:px-10 px-3 md:px-3 ">
            Performers
          </h1>

          <div className="md:pr-10">
            <Select
              options={options}
              value={selectedOption}
              onChange={setSelectedOption}
              placeholder="Sort by..."
              styles={customStyles}
              className="lg:w-40"
            />
          </div>
        </div>
        <div className=" lg:hidden flex flex-col gap-5 rounded pt-0  ">
          <div className="rounded p-4 shadow-md bg-white">
            {/* Heading */}
            <h1 className="text-lg font-medium text-gray-900 p-2 border-b ">
              Performers Category
            </h1>

            {/* Scrollable Categories */}
            <section className="flex flex-wrap lg:flex-col gap-3 pt-3 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              {/* Category Wrapper */}
              <div className="flex gap-3 flex-wrap md:flex-nowrap">
                <div
                  onClick={() => setCategory("band")}
                  className="bg-gray-200 hover:bg-[#ff2459] hover:text-white w-max rounded-full font-medium p-2 px-4 text-xs cursor-pointer"
                >
                  Band
                </div>
                <div
                  onClick={() => setCategory("disc jockey")}
                  className="bg-gray-200 hover:bg-[#ff2459] hover:text-white w-max rounded-full font-medium p-2 px-4 text-xs cursor-pointer"
                >
                  Disc Jockey
                </div>
                <div
                  onClick={() => setCategory("sound artist")}
                  className="bg-gray-200 hover:bg-[#ff2459] hover:text-white w-max rounded-full font-medium p-2 px-4 text-xs cursor-pointer"
                >
                  Sound Artist
                </div>
                <div
                  onClick={() => setCategory("standup comedian")}
                  className="bg-gray-200 hover:bg-[#ff2459] hover:text-white w-max rounded-full font-medium p-2 px-4 text-xs cursor-pointer"
                >
                  Stand-up Comedian
                </div>
              </div>
            </section>
          </div>

          <div className="rounded border ">
            <h1 className="text-lg font-medium text-gray-900 p-3 border-b flex justify-between">
              Find Events
              <div className="flex  gap-2 text-xl">
                <button
                  onClick={() => handleShare("facebook")}
                  className="flex gap-1 shadow border p-1 rounded"
                >
                  <FaSquareFacebook className="text-red-500 relative " />
                </button>
                <button
                  onClick={() => handleShare("whatsapp")}
                  className="flex gap-1 shadow border p-1 rounded"
                >
                  <FaWhatsapp className="bg-red-500 text-white p-0.5" />
                </button>
                <button
                  onClick={() => handleShare("messenger")}
                  className="flex gap-1 shadow border p-1 rounded"
                >
                  <FaFacebookMessenger className="text-red-500" />
                </button>
                <button
                  onClick={() => handleShare("twitter")}
                  className="flex gap-1 shadow border p-1 rounded"
                >
                  <FaSquareXTwitter className="text-red-500" />
                </button>
              </div>
            </h1>
            <div className="flex justify-center items-center ">
              <div className="flex  md:gap-7 gap-5 p-3 overflow-x-scroll ">
                <div className="bg-blue-600 rounded h-28 min-w-28 text-white font-medium flex flex-col gap-2 items-start p-4 ">
                  <BsCalendar2DateFill className=" text-white  text-2xl font-medium" />

                  <p>Today 0</p>
                </div>
                <div className="bg-orange-400 rounded h-28 min-w-28 font-medium flex flex-col gap-2 items-start p-4 text-white">
                  <BsCalendar2DateFill className=" text-white text-2xl font-medium" />

                  <p>Tommorrow 0</p>
                </div>
                <div className="bg-blue-400 rounded h-28 min-w-28 font-medium flex flex-col gap-2 items-start p-4 text-white">
                  <HiOutlineCalendarDateRange className="text-2xl text-white font-medium" />

                  <p className="text-sm p-1">This Weekend 0</p>
                </div>
                <div className="bg-green-600  rounded h-28 min-w-28 font-medium flex flex-col gap-2 items-start p-4 text-white">
                  <CalendarCheck className="text-2xl text-white font-medium" />
                  <p>Choose Date</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid  lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:gap-14 gap-10 lg:p-10 p-2 lg:pt-10 pt-5 ">
          {data.length > 0 ? (
            data.map((item, index) => {
              return (
                <div
                  key={index}
                  className="w-68 h-78  flex flex-col pb-5 shadow-md items-center justify-between rounded border  "
                >
                  <div
                    onClick={() => {
                      navigate(`/Performer/${item._id}`, {
                        state: item._id,
                      });
                    }}
                    className="h-40 md:h-36 lg:h-40 w-full overflow-hidden flex items-center justify-center"
                  >
                    <img
                      src={item.profileImage}
                      className="h-full w-full object-cover transition-transform duration-300 hover:scale-125"
                      alt={item.name}
                    />
                  </div>
                  <div
                    onClick={() => {
                      navigate(`/Performer/${item._id}`, {
                        state: item._id,
                      });
                    }}
                    className="p-2"
                  >
                    <h1 className="font-medium text-lg capitalize">
                      {item.name}
                    </h1>
                    <section className="text-sm text-gray-500 ">
                      {item.address}, {item.city}, {item.state}
                    </section>
                  </div>
                  <div className="flex justify-between">
                    <p className="flex gap-2 p-1 px-3 text-lg">
                      <button className="text-red-500">
                        <a href={item.facebookUrl ? item.facebookUrl : ""}>
                          {item.facebookUrl ? (
                            <CiFacebook className="text-red-500" />
                          ) : (
                            ""
                          )}
                        </a>
                      </button>
                      <button className="text-red-500">
                        <a href={item.instagramUrl ? item.instagramUrl : ""}>
                          {item.instagramUrl ? (
                            <FaInstagram className="text-red-500" />
                          ) : (
                            ""
                          )}
                        </a>
                      </button>
                      <button
                        onClick={() => {
                          if (!isLogin) {
                            toast.error("Please login first to Add favorite!", {
                              transition: Zoom,
                              hideProgressBar: true,
                              autoClose: 2000,
                            });
                            return;
                          }
                          toggleFavorite(item._id);
                        }}
                        className={`flex gap-1 text-xs font-bold cursor-pointer ${
                          isFavouritePerformer(item._id)
                            ? "text-[#ff2459]"
                            : "text-gray-200"
                        }`}
                      >
                        <FaHeart className="text-lg" />
                      </button>

                      <button className="text-red-500">
                        <a href={item.twitterUrl ? item.twitterUrl : ""}>
                          {item.twitterUrl ? (
                            <FaSquareXTwitter className="text-red-500" />
                          ) : (
                            ""
                          )}
                        </a>
                      </button>
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="flex lg:h-[500px] md:h-[400px] h-[250px]  font-medium text-3xl justify-center items-center">
              No data found...
            </div>
          )}
        </div>

        <div className="pb-3 ">
          <Pagination
            handlePreviousPage={handlePreviousPage}
            currentPage={currentPage}
            handleNextPage={handleNextPage}
            totalPages={totalPages}
          />
        </div>
      </div>
      <div className="lg:w-[25%] lg:block hidden w-full gap-8 rounded pt-5 pr-3 mt-2 ">
        <div className="flex flex-col gap-2 px-2 shadow-md p-4">
          <div className="grid grid-cols-3 gap-2 text-xl">
            <button
              onClick={() => handleShare("facebook")}
              className="flex gap-1 shadow border p-1 rounded"
            >
              <span className="text-sm border-r px-2">SHARE </span>
              <FaSquareFacebook className="text-red-500 relative " />
            </button>
            <button
              onClick={() => handleShare("whatsapp")}
              className="flex gap-1 shadow border p-1 rounded"
            >
              <span className="text-sm border-r px-2">SHARE </span>
              <FaWhatsapp className="bg-red-500 text-white p-0.5" />
            </button>
            <button
              onClick={() => handleShare("messenger")}
              className="flex gap-1 shadow border p-1 rounded"
            >
              <span className="text-sm border-r px-2">SHARE </span>
              <FaFacebookMessenger className="text-red-500" />
            </button>
            <button
              onClick={() => handleShare("twitter")}
              className="flex gap-1 shadow border p-1 rounded"
            >
              <span className="text-sm border-r px-2">SHARE </span>
              <FaSquareXTwitter className="text-red-500" />
            </button>
          </div>
        </div>
        <div className=" lg:flex hidden flex-col gap-5 rounded pt-5 pr-3 ">
          <div className="rounded p-2 shadow ">
            <h1 className="text-lg font-medium text-gray-900 p-3 border-b ">
              Performers Category
            </h1>
            <section className="flex flex-col gap-2 pt-3 justify-center items-center">
              <div className="flex gap-2 ">
                <div
                  onClick={() => {
                    setCategory("band");
                  }}
                  className="bg-gray-200 cursor-pointer hover:bg-[#ff2459] hover:text-white   w-max rounded-full font-medium p-1 px-4 text-xs "
                >
                  Band
                </div>
                <div
                  onClick={() => {
                    setCategory("disc jockey");
                  }}
                  className="bg-gray-200 cursor-pointer whitespace-nowrap hover:bg-[#ff2459] hover:text-white   w-max rounded-full font-medium p-1 px-4 text-xs "
                >
                  Disc Jockey
                </div>
                <div
                  onClick={() => {
                    setCategory("sound artist");
                  }}
                  className="flex gap-2 px-2"
                >
                  <div className="bg-gray-200 cursor-pointer whitespace-nowrap hover:bg-[#ff2459] hover:text-white w-max rounded-full font-medium p-1 px-4 text-xs ">
                    Sound Artist
                  </div>
                </div>
              </div>
              <div className="flex gap-2 ">
                <div
                  onClick={() => {
                    setCategory("standup comedian");
                  }}
                  className="flex gap-2 px-2"
                >
                  <div className="bg-gray-200 cursor-pointer whitespace-nowrap hover:bg-[#ff2459] hover:text-white w-max rounded-full font-medium p-1 px-4 text-xs ">
                    Stand up comedian
                  </div>
                </div>
              </div>
            </section>
          </div>
          <div className="rounded border">
            <h1 className="text-lg font-medium text-gray-900 p-3 border-b">
              Find Events
            </h1>
            <div className="flex justify-center items-center ">
              <div className="grid grid-cols-2 gap-4 p-3 ">
                <div className="bg-blue-600 rounded h-28 w-28 text-white font-medium flex flex-col gap-2 items-start p-4">
                  <BsCalendar2DateFill className=" text-white  text-2xl font-medium" />

                  <p>Today 0</p>
                </div>
                <div className="bg-orange-400 rounded h-28 w-28 font-medium flex flex-col gap-2 items-start p-4 text-white">
                  <BsCalendar2DateFill className=" text-white text-2xl font-medium" />

                  <p>Tommorrow 0</p>
                </div>
                <div className="bg-blue-400 rounded h-28 w-28 font-medium flex flex-col gap-2 items-start p-4 text-white">
                  <HiOutlineCalendarDateRange className="text-2xl text-white font-medium" />

                  <p className="text-sm p-1">This Weekend 0</p>
                </div>
                <div className="bg-green-600 h-28 rounded w-28 font-medium flex flex-col gap-2 items-start p-4 text-white">
                  <CalendarCheck className="text-2xl text-white font-medium" />
                  <p>Choose Date</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GetPerformers;
