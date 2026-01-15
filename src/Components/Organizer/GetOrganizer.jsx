import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrganizer } from "../../redux/actions/master/Organizer/getOrganiser";
import Loading from "../Loading";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FcLike } from "react-icons/fc";
import { CiFacebook } from "react-icons/ci";
import {
  FaFacebookMessenger,
  FaHeart,
  FaInstagram,
  FaSquareFacebook,
  FaSquareXTwitter,
  FaWhatsapp,
} from "react-icons/fa6";
import Select from "react-select";
import { IoLogoWhatsapp, IoStarSharp } from "react-icons/io5";
import { BsCalendar2DateFill } from "react-icons/bs";
import { HiOutlineCalendarDateRange } from "react-icons/hi2";
import { CalendarCheck } from "lucide-react";
import Pagination from "../Pagination";
import { postFavouriteOrganizer } from "../../redux/actions/master/Organizer/postFavouriteOrganizer";
import { getFavouriteOrganizerData } from "../../redux/actions/master/Organizer/GetFavouriteOrganizer";
import { removeFavouriteOrganizer } from "../../redux/actions/master/Organizer/removeFavouriteOrganizer";
import { toast, Zoom } from "react-toastify";
import CommonCalendar from "../CommonCalendar";

function GetOrganizer() {
  const navigate = useNavigate();
  const location = useLocation();
  const { slug } = useParams(); // Get slug from URL
  const value = location.state;
  const filterValue = value ? value.toLowerCase() : "";
  const [localIsFavorite, setLocalIsFavorite] = useState("isFavourite");

  {
    /*header*/
  }
  const [category, setCategory] = useState("");
  
  // Convert slug to category name format (e.g., "test-orgainzer" -> "test orgainzer")
  // This handles dynamic slugs from the URL
  const slugCategory = slug ? slug.replace(/-/g, " ") : "";

  const category1 = "";
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

  // Reset page when slug changes
  useEffect(() => {
    if (slug) {
      setCurrentPage(1);
    }
  }, [slug]);

  useEffect(() => {
    // Priority: category (from button click) > slugCategory (from URL) > filterValue (from state)
    let categoryToUse = "";
    if (category1) {
      categoryToUse = category1;
    } else if (category) {
      categoryToUse = category;
    } else if (slugCategory) {
      categoryToUse = slugCategory;
    } else if (filterValue) {
      categoryToUse = filterValue;
    }

    dispatch(
      getOrganizer(
        setLoading,
        selectedOption?.value || "",
        currentPage,
        categoryToUse
      )
    );
  }, [dispatch, selectedOption, currentPage, category1, category, filterValue, slugCategory]);

  const store = useSelector((state) => state.getOrganizerReducer) || {
    organizerData: [],
  };

  const data1 = store.organizerData;
  const data = [...new Set(data1)];

  const store1 = useSelector((state) => state.getFavoriteOrganizerReducer) || {
    favouriteOrganizerData: [],
  };
  const favouriteOrganizer = store1.favouriteOrganizerData;

  const isLogin = JSON.parse(localStorage.getItem("isLogin"));

  const isFavoriteOrganizer = (id) => {
    return favouriteOrganizer.some((fav) => fav._id === id);
  };

  const toggleFavorite = (id) => {
    if (isFavoriteOrganizer(id)) {
      dispatch(removeFavouriteOrganizer(id));
      dispatch(getFavouriteOrganizerData(setLoading));
    } else {
      dispatch(postFavouriteOrganizer(id));
      dispatch(getFavouriteOrganizerData(setLoading));
    }
    dispatch(getFavouriteOrganizerData(setLoading));
  };

  useEffect(() => {
    dispatch(getFavouriteOrganizerData(setLoading));
  }, [dispatch]);

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

  const totalPages = store.totalPages;

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
            Organizers
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
        <div className=" lg:hidden flex  flex-col gap-5 rounded pt-0  ">
          <div className="rounded p-2 shadow md:flex md:gap-7 justify-between ">
            <h1 className="text-lg font-medium text-gray-900 p-2 border-b ">
              Oragnizer Category
            </h1>
            <section className="flex lg:flex-col flex-row  overflow-x-scroll gap-2 pt-3 ">
              <div className="flex gap-2 ">
                <div
                  onClick={() => {
                    setCategory("event planner");
                  }}
                  className="cursor-pointer bg-gray-200 hover:bg-[#ff2459] hover:text-white    w-max rounded-full font-medium p-1 px-4 text-xs "
                >
                  Event Planner
                </div>
                <div
                  onClick={() => {
                    setCategory("wedding planner");
                  }}
                  className="cursor-pointer bg-gray-200 whitespace-nowrap hover:bg-[#ff2459] hover:text-white    w-max rounded-full font-medium p-1 px-4 text-xs "
                >
                  Wedding Planner
                </div>
              </div>
              <div className="flex gap-2 px-2">
                <div
                  onClick={() => {
                    setCategory("adventure");
                  }}
                  className="cursor-pointer bg-gray-200 whitespace-nowrap hover:bg-[#ff2459] hover:text-white   w-max rounded-full font-medium p-1 px-4 text-xs "
                >
                  Adventure
                </div>
              </div>
            </section>
          </div>
          <div className="rounded border ">
            <h1 className="text-lg font-medium text-gray-900 p-4 border-b flex justify-start ">
              Share
              <div className="flex ml-4 gap-4 mt-1 text-2xl ">
                <FaSquareFacebook
                  onClick={() => handleShare("facebook")}
                  className=" text-blue-600  relative "
                />
                <FaWhatsapp
                  onClick={() => handleShare("whatsapp")}
                  className=" text-green-600  relative "
                />
                <FaFacebookMessenger
                  onClick={() => handleShare("messenger")}
                  className=" text-blue-800  relative "
                />
                <FaSquareXTwitter
                  onClick={() => handleShare("twitter")}
                  className=" text-white-600 relative"
                />
              </div>
            </h1>
            <hr />
            <h2 className="text-lg font-medium text-gray-900 p-2 border-b flex justify-start ml-2">
              Find Events
            </h2>
            <CommonCalendar /> 
          </div>
        </div>

        {data.length === 0 && !loading ? (
          <div className="flex flex-col items-center justify-center py-20 px-4">
            <div className="text-center">
              <svg
                className="mx-auto h-24 w-24 text-gray-400 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No Organizers Found
              </h3>
              <p className="text-gray-600 mb-4">
                {category || slugCategory || filterValue
                  ? `We couldn't find any organizers in the "${category || slugCategory || filterValue}" category.`
                  : "There are no organizers available at the moment."}
              </p>
              {(category || slugCategory || filterValue) && (
                <button
                  onClick={() => {
                    setCategory("");
                    navigate("/organizers");
                  }}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#ff2459] hover:bg-[#e01e4f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ff2459] transition-colors"
                >
                  View All Organizers
                </button>
              )}
            </div>
          </div>
        ) : (
          <>
            <div className="grid  lg:grid-cols-3 md:grid-cols-3 lg:gap-14 gap-10 lg:p-10 p-2 lg:pt-10 pt-5 grid-cols-1">
              {data.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="w-68 h-78 flex flex-col pb-4 shadow-md items-center justify-between rounded border  "
                  >
                    <div
                      onClick={() => {
                        navigate(`/Organizer/${item._id}`, {
                          state: item,
                        });
                      }}
                      className="h-40 md:h-36 lg:h-40 w-full overflow-hidden"
                    >
                      <img
                        src={item.profileImage}
                        className="rounded-t h-40 w-full object-cover transition-transform duration-300 hover:scale-125"
                        alt={item.name}
                      />
                    </div>
                    <div
                      onClick={() => {
                        navigate(`/Organizer/${item._id}`, {
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
                            isFavoriteOrganizer(item._id)
                              ? "text-red-500"
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
              })}
            </div>
            {data.length > 0 && (
              <div className="pb-3">
                <Pagination
                  handlePreviousPage={handlePreviousPage}
                  currentPage={currentPage}
                  handleNextPage={handleNextPage}
                  totalPages={totalPages}
                />
              </div>
            )}
          </>
        )}
      </div>
      <div className="w-[25%] lg:flex hidden flex-col gap-8 rounded pt-5 pr-3 mt-2 ">
        <div className="lg:flex hidden flex-col gap-5 border justify-center bg-white shadow-md  w-[95%] ml-3 ">
          <div className=" p-3 shadow gap-2 ">
            <h1 className="text-lg font-medium text-gray-900 p-2 border-b ">
              Share WEBB
            </h1>
            <div className="flex flex-cols gap-4 text-2xl p-2 cursor-pointer mt-2">
              <FaSquareFacebook
                onClick={() => handleShare("facebook")}
                className="text-blue-500 border-0 border-transparent rounded hover:shadow-[0_0_10px_3px_#1877f2] transition duration-300"
              />

              <FaWhatsapp
                onClick={() => handleShare("whatsapp")}
                className="text-green-600 border-0 border-transparent rounded hover:shadow-[0_0_10px_3px_#25D366] transition duration-300"
              />

              <FaFacebookMessenger
                onClick={() => handleShare("messenger")}
                className="text-blue-700 border-0 border-transparent rounded hover:shadow-[0_0_10px_3px_#0084ff] transition duration-300"
              />

              <FaSquareXTwitter
                onClick={() => handleShare("twitter")}
                className="text-black-500 border-0 border-transparent rounded hover:shadow-[0_0_10px_3px_#000000] transition duration-300"
              />
            </div>
          </div>
        </div>

        <div className="lg:flex hidden flex-col gap-5 border justify-center bg-white shadow-md  w-[95%] ml-3 ">
          <div className=" p-3  shadow gap-2 ">
            <h1 className="text-lg font-medium text-gray-900 p-1 border-b ">
              Organizer Category
            </h1>
            <section className="flex flex-wrap gap-3 pt-5 p-2  justify-start items-start">
              <div className="flex gap-2 flex-wrap justify-center">
                <div
                  onClick={() => {
                    setCategory("event planner");
                  }}
                  className="cursor-pointer bg-gray-200 hover:bg-[#ff2459] hover:text-white   w-max rounded-full font-medium p-1 px-4 text-xs "
                >
                  Event Planner
                </div>
                <div
                  onClick={() => {
                    setCategory("wedding planner");
                  }}
                  className="cursor-pointer bg-gray-200 whitespace-nowrap hover:bg-[#ff2459] hover:text-white   w-max rounded-full font-medium p-1 px-4 text-xs "
                >
                  Wedding Planner
                </div>
                <div
                  onClick={() => {
                    setCategory("adventure");
                  }}
                  className="cursor-pointer bg-gray-200 whitespace-nowrap hover:bg-[#ff2459] hover:text-white w-max rounded-full font-medium p-1 px-4 text-xs "
                >
                  Adventure
                </div>
              </div>
            </section>
          </div>
        </div>
        <div className="border shadow w-[95%] ml-3">
          <h1 className="text-lg font-medium border-b text-gray-900 p-2 w-[95%] ml-2">
            Find Events
          </h1>
          <CommonCalendar /> 
        </div>
      </div>
    </div>
  );
}

export default GetOrganizer;
