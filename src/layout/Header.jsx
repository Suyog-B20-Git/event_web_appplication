import {
  IoLocationSharp,
  IoMenu,
  IoSearch,
  IoSearchSharp,
  IoTicket,
} from "react-icons/io5";

import { useState, useEffect, useRef } from "react";
import Button from "../Components/Button";
// import InputField from "../ReusableComponents/InputField";
import Sidebar from "./Sidebar";
import {
  IoIosLogOut,
  IoIosPerson,
  IoMdArrowDropdown,
  IoMdHome,
} from "react-icons/io";
import {
  MdContactPhone,
  MdDashboard,
  MdEvent,
  MdMiscellaneousServices,
} from "react-icons/md";
import { GrGroup } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode"; // Correct import
import { CiSearch } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import gsap from "gsap";
import axios from "axios";
const baseUrl = import.meta.env.VITE_API_URL;

const Header = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState(false);
  const [ShowPopup, setShowPopup] = useState(false);
  const [userName, setUserName] = useState(""); // State to store the name from JWT
  const [refresh, setRefresh] = useState(0);
  const [suggestions, setSuggestions] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [searchDropdown, setSearchDropdown] = useState(false);
  const [query, setQuery] = useState("All-locations");
  const [search, setSearch] = useState("");
  const wrapperRef = useRef(null);
  const [isSelectedFromDropdown, setIsSelectedFromDropdown] = useState(false);
  const [searchValue, setSearchValue] = useState("All");
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const itemRefs = useRef([]);

  useEffect(() => {
    if (highlightedIndex >= 0 && itemRefs.current[highlightedIndex]) {
      itemRefs.current[highlightedIndex].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [highlightedIndex]);
  // Get the authToken from localStorage
  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    if (authToken) {
      const decodedToken = jwt_decode(authToken);
      if (decodedToken?.name) {
        setUserName(decodedToken.name); // Set user name if token is valid
      }
      if (decodedToken?.role) {
        localStorage.setItem("role", decodedToken.role);
      }
    }
  }, [authToken]);

  const role = localStorage.getItem("role");
  const [isSearch, setIsSearch] = useState(false);
  const handleShowAlert = () => setShowPopup(true);

  var text_data = [
    { name: "Home", icon: <IoMdHome />, path: "/home" },
    {
      name: "Events",
      filterPath: "/filtered-events",
      path: "/events",
      icon: <MdEvent />,
      popUpMenu: [
        { name: "Business", path: "/events/business" },
        { name: "Festivals", path: "/events/festivals" },
        { name: "Live Music", path: "/events/live-music" },
        { name: "Nightlife and club", path: "/events/nightlife-and-club" },
        { name: "Professional", path: "/events/professional" },
        { name: "Social", path: "/events/social" },
        { name: "Sport & Leisure", path: "/events/sport-and-leisure" },
        { name: "Theatre & Arts", path: "/events/theatre-and-arts" },
      ],
    },
    {
      name: "Organisers",
      filterPath: "/Organizers",
      path: "/organizers",
      icon: <GrGroup />,
      popUpMenu: [
        { name: "Event Planner", path: "organizers/event-planner" },
        { name: "Wedding Planner", path: "organizers/wedding-planner" },
        { name: "Adventure", path: "organizers/adventure" },
      ],
    },
    {
      name: "Performers",
      filterPath: "/Performers",
      path: "/performers",
      icon: <IoIosPerson />,
      popUpMenu: [
        { name: "Band", path: "/performers/band" },
        { name: "Disc Jockey", path: "/performers/disc-jokey" },
        { name: "Sound Artist", path: "/performers/sound-artist" },
        { name: "Stand up Comedian", path: "/performers/stand-up-comedian" },
      ],
    },

    {
      name: "Services",
      path: "/services",
      filterPath: "/Services",
      icon: <MdMiscellaneousServices />,
      popUpMenu: [
        { name: "Anchor", path: "/services/anchor" },
        { name: "Decor", path: "/services/decor" },
        { name: "Entertainer", path: "/services/entertainer" },
        { name: "Party Supplies", path: "/services/party-supplies" },
        {
          name: "Photography & Videography",
          path: "/services/photography-and-videography",
        },
        { name: "Promoters", path: "/services/promoters" },
        { name: "DanceStudio", path: "/services/dance-studio" },
      ],
    },
    {
      name: "Venues",
      path: "/venues",
      filterPath: "/Venues",
      icon: <IoLocationSharp />,
      popUpMenu: [
        { name: "Indoor", path: "/venues/indoor" },
        { name: "Outdoor", path: "/venues/outdoor" },
      ],
    },
    { name: "Contact Us", path: "/contact-us", icon: <MdContactPhone /> },
  ];

  const [isLog, setIsLog] = useState(false);
  const [isPop, setIsPop] = useState(false);
  const boxRef = useRef(null);
  const dropdownRef = useRef(null); // Ref for the dropdown

  useEffect(() => {
    gsap.from(boxRef.current, {
      y: 100, // Moves up from 100px
      opacity: 0, // Starts with opacity 0
      duration: 1, // Animation lasts for 1 second
      ease: "power3.out",
    });
  }, []);

  const [activeIndex, setActiveIndex] = useState(null);

  const handleSearch = () => {
    if (location.trim()) {
      const searchLocation = searchValue === "All" ? "" : `?location=${encodeURIComponent(searchValue)}`;
      navigate(`/city/location${searchLocation}`);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsLog(false);
        setIsPop(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleProfileClick = async () => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      console.error("No auth token found");
      return;
    }

    try {
      const response = await axios.get(`${baseUrl}/api/user`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      if (response.data.status) {
        localStorage.setItem("userProfile", JSON.stringify(response.data.data));
        setIsLog(false);
        navigate("/profile");
      } else {
        console.error("Failed to fetch user:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  const handleLogOut = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("isLogin");
    localStorage.removeItem("eventData");
    navigate("/home");
  };

  const handleClickOutside1 = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setIsSearch(false);
    }
  };

  const searchRef = useRef(null);

  useEffect(() => {
    if (isSearch) {
      document.addEventListener("mousedown", handleClickOutside1);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside1);
    };
  }, [isSearch]);

  // Fetch location suggestions based on user input
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchValue.length > 0 && searchValue !== "All") {
        try {
          const response = await axios.get(`${baseUrl}/api/location/locationSuggestions?search=${searchValue}`
          );
          setSuggestions(response.data || []);
          setShowLocationDropdown(true);
        } catch (error) {
          console.error("Error fetching suggestions:", error);
        }
      } else {
        setSuggestions([]);
        setShowLocationDropdown(false);
      }
    };

    const debounce = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounce);
  }, [searchValue]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowLocationDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (locationString) => {
    const cityOnly = locationString.split(",")[0].trim();
    setQuery(cityOnly);
    setSearchValue(cityOnly);
    setShowLocationDropdown(false);
  };
  const skipSearchRef = useRef(false);

  // Fetch search results based on user input
  useEffect(() => {
    const fetchSearchResults = async () => {
      if (skipSearchRef.current) {
        skipSearchRef.current = false; 
        return;
      }

      if (search.length > 0) {
        try {
          const response = await axios.get(
            `${baseUrl}/api/search?query=${search}`
          );
        
          const receivedData = response?.data?.data;
          const filterData = [];

          for (const category in receivedData) {
            if (Array.isArray(receivedData[category])) {
              receivedData[category].forEach((item) => {
                filterData.push({
                  ...item,
                  categoryGroup: category,
                  eventCategory: item.category,
                  category: category,

                  
                });
              });
            }
          }

          setSearchResults(filterData);
          setSearchDropdown(true);
        } catch (error) {
          console.error("Error fetching Search Results:", error);
        }
      }
    };
    const debounce = setTimeout(fetchSearchResults, 300);
    return () => clearTimeout(debounce);
  }, [search]);

  useEffect(() => {
    const handleClickOutside1 = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside1);
    return () => document.removeEventListener("mousedown", handleClickOutside1);
  }, []);

  const handleSelectSearch = (item) => {
    skipSearchRef.current = true;
    setSearch(item.name);
    const formattedCategory =
    item.eventCategory?.toLowerCase().replace(/\s+/g, "-") || "general";
    switch (item.category) {
      case "events":
        navigate(`/events/${formattedCategory}/${item._id}` || `/events/${item.slug || "featured-event"}`, {
          state: item._id,
        }
        );
        break;
      case "organizers":
        navigate(`/Organizer/${item._id}`);
        break;
      case "performers":
        navigate(`/Performer/${item._id}`);
        break;
      case "services":
        navigate(`/Service/${item._id}`);
        break;
      case "venues":
        navigate(`/Venue/${item._id}`);
        break;
      default:
        console.warn("Unknown category:", item.category);
        break;
    }
    setSearchDropdown(false);
    setSearchResults([]);
  };

  return (
    <div className="bg-gray-900 text-white p-1 fixed w-full z-30">
      <div>
        <div className="lg:w-[100%] w-[100%]  lg:h-[140px] inset-0 z-60 items-center justify-center bg-opacity-50 relative">
          {/* first div */}
          <div className="flex w-[100%] md:h-[80px] h-[80px]  lg:h-[80px]  inset-0 z-60 items-center justify-center bg-opacity-50 relative ">
            {/* <div className="flex justify-between  items-center  lg:w-[60%] w-[100%] "> */}
            <div className="flex items-center justify-between w-full lg:h-[100px] px-4">
              {/* <div
                className="md:w-[35%] lg:w-[100%] w-[100%]  
            ml-3 relative lg: p-1 rounded-md "
              > */}
              <div className="lg:w-[30%] md:w-[25%] w-auto">
                {/* <div className="md:w-[35%] w-[80%]  ml-3 relative z-20 p-1 rounded-md"> */}

                <img
                  src="/assets/staticAssets/logo.png"
                  className="hidden md:block lg:w-[80%] md:w-[100%] w-auto"
                  // className="lg:block md:block hidden md:w-[17vw] relative  [17vw] lg:w-[80%]  "
                  alt="logo"
                  onClick={() => navigate("/home")}
                />
              </div>

              {/*Mobile view */}
              {/* Mobile Logo */}
              {isSearch ? (
                <div
                  ref={searchRef}
                  className="flex relative lg:hidden md:hidden px-4 items-center rounded-full bg-gray-100 shadow-md p-2 w-full mx-auto"
                >
                  <span className="text-gray-700 text-lg font-bold">
                    <IoSearch />
                  </span>
                  <input
                    type="search"
                    placeholder="Search events"
                    onClick={() => setLocation(true)}
                    className="bg-transparent outline-none px-4 text-gray-700 w-full"
                  />
                </div>
              ) : (
                <img
                  src="/assets/staticAssets/logo.png"
                  className="lg:hidden md:hidden block h-[40%] w-[40%] mx-auto"
                  alt="logo"
                  onClick={() => navigate("/home")}
                />
              )}

              <div class="relative flex items-center justify-end md:w-[65%] w-full p-2 mx-auto">
                {/* <div className="relative z-20 md:w-[65%] w-[96%] "> */}
                {/* search bar */}

                <div className="lg:flex md:flex hidden  lg:flex-row flex-col items-center rounded-full bg-gray-100 shadow-md p-2 lg:w-full w-[80%]  mx-auto">
                  {/* Search Input */}
                  <div
                    className="hidden lg:flex md:flex flex-1 justify-center"
                    ref={searchRef}
                  >
                    <input
                      type="text"
                      placeholder="Search events"
                      value={search}
                      onChange={(e) =>{ setSearch(e.target.value);
                        setHighlightedIndex(-1);
                      }}
                      onClick={() => setLocation(true)}
                      onKeyDown={(e) => {
                        if (!searchResults.length) return;
                    
                        switch (e.key) {
                          case "ArrowDown":
                            setHighlightedIndex((prev) => (prev + 1) % searchResults.length);
                            break;
                          case "ArrowUp":
                            setHighlightedIndex((prev) =>
                              prev <= 0 ? searchResults.length - 1 : prev - 1
                            );
                            break;
                          case "Enter":
                            if (highlightedIndex >= 0) {
                              handleSelectSearch(searchResults[highlightedIndex]);
                              e.preventDefault();
                            }
                            break;
                          default:
                            break;
                        }
                      }}
                      className="flex-1 bg-transparent outline-none px-4 text-gray-700"
                    />
                  </div>
                  <div className="absolute flex-1" ref={skipSearchRef}>
                    {searchDropdown && searchResults.length > 0 && (
                      <ul className="absolute z-10  bg-white text-black border mt-3 rounded w-60 max-h-48  overflow-y-auto shadow-md">
                        {searchResults.map((item, index) => (
                          <li
                            key={item._id}
                            ref={(el) => (itemRefs.current[index] = el)}
                            onMouseDown={() => handleSelectSearch(item)}
                            className={`px-4 py-2 cursor-pointer hover:bg-gray-200 ${
                              index === highlightedIndex ? "bg-gray-300 font-semibold" : ""
                            }`}
                          >
                            <span className="font-medium">{item.name}</span>{" "}
                            <span className="text-gray-500 text-sm">
                              {" "}
                              — {item.category}{" "}
                            </span>{" "}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Location */}
                  <div className="lg:flex hidden items-center gap-2 px-4 border-l border-gray-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 64 64"
                      height={"20px"}
                      id="location"
                    >
                      <g fill="#134563">
                        <path d="m32 55.7-.9-1.1c-.6-.8-15.9-18.7-15.9-29.4 0-9.3 7.6-16.8 16.8-16.8S48.8 16 48.8 25.2c0 10.7-15.3 28.7-15.9 29.4l-.9 1.1zm0-45c-8 0-14.4 6.5-14.4 14.4 0 8.4 11.1 22.7 14.4 26.8 3.3-4.1 14.4-18.3 14.4-26.8 0-7.9-6.4-14.4-14.4-14.4z"></path>
                        <path d="M32 31.6c-3.5 0-6.4-2.9-6.4-6.4s2.9-6.4 6.4-6.4 6.4 2.9 6.4 6.4-2.9 6.4-6.4 6.4zm0-10.4c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4z"></path>
                      </g>
                    </svg>
                    <div className="flex" ref={wrapperRef}>
                      <input
                        type="text"
                        placeholder="location"
                        value={query}
                        onChange={(e) => {
                          const value = e.target.value;
                          setQuery(value);
                          setSearchValue(value);
                        }}
                        onClick={() => setLocation(true)}
                        className="flex-1 bg-transparent outline-none px-2 text-gray-700"
                      />
                      {/* Search Button */}
                      <button className="bg-[#e33661]   font-semibold p-1 rounded-full">
                        <IoSearchSharp
                          className="text-white text-xl"
                          onClick={() => {
                            if (searchValue.trim()) {
                              navigate(`/city/location?location=${encodeURIComponent(searchValue)}`);}
                          }}
                        />
                      </button>
                    </div>
                    <div className="absolute">
                      {showLocationDropdown && suggestions.length > 0 && (
                        <ul className="absolute z-10  bg-white text-black border mt-3 rounded w-60  max-h-48 overflow-y-auto shadow-md">
                          {suggestions.map((suggestion, index) => (
                            <li
                              key={index}
                              onMouseDown={() =>
                                handleSelect(
                                  `${suggestion.name}, ${suggestion.state_name}, ${suggestion.country_name}`
                                )
                              }
                              className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                            >
                              {`${suggestion.name}, ${suggestion.state_name}, ${suggestion.country_name}`}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>

                {/*Mobile view search bar button*/}
                {!isSearch && (
                  <button
                    onClick={() => setIsSearch(true)}
                    className={`lg:hidden md:hidden block text-2xl m-1 mr-6 p-1 rounded-full bg-[#ff2459] font-bold`}
                  >
                    <CiSearch />
                  </button>
                )}

                <div
                  className="relative z-20 w-[10%] block lg:hidden md:left-4  text-4xl sm:font-medium font-normal  sm:text-2xl"
                  onClick={(e) => handleShowAlert()}
                >
                  <IoMenu />
                </div>
              </div>
            </div>

            {/* second div */}
            <div className="lg:flex p-4  relative z-60  lg:justify-end hidden   md:w-[40%] w-[100%]">
              <div className=" m-1">
                <Button
                  text={"Create Event"}
                  rounded={"rounded"}
                  variant={"primary"}
                  onClick={() => navigate("/create-event")}
                />
              </div>
              <div className="m-1">
                <Button
                  text={"Create Page"}
                  rounded={"rounded"}
                  variant={"primary"}
                  onClick={() => navigate("/create-page")}
                />
              </div>
            </div>
          </div>

          {/* Second Headding */}
          <div className="w-full hidden lg:flex items-center justify-between">
            <div className="sm:flex justify-end gap-3 lg:relative items-center w-full flex-nowrap">
              {text_data.map((item, index) => (
                <div
                  key={index}
                  className="relative pb-2"
                  onMouseEnter={() => setActiveIndex(index)} // Keep active when hovering over button or dropdown
                  onMouseLeave={() => setActiveIndex(null)} // Close dropdown only when mouse leaves both
                >
                  <button
                    className="font-medium lg:text-lg md:text-sm lg:mr-5 flex lg:gap-1 md:gap-0.5 relative z-60"
                    onClick={() => navigate(item.path)}
                  >
                    <p className="relative top-1.5">{item.icon}</p> {item.name}
                  </button>

                  {activeIndex === index && item.popUpMenu && (
                    <div
                      ref={boxRef}
                      className=" bg-white rounded text-gray-900 absolute top-7 left-0   h-max mt-1 shadow-lg"
                    >
                      {item.popUpMenu.map((menuItem, menuIndex) => (
                        <button
                          key={menuIndex}
                          onClick={() => {
                            setRefresh((prev) => prev + 1);
                            navigate(menuItem.path, {
                              state: menuItem.name,
                            });
                          }}
                          className="flex justify-start  gap-2 p-2.5 font-medium hover:text-white whitespace-nowrap hover:bg-[#ff2459]  w-56 "
                        >
                          {/* <MdDashboard className="hover:text-white relative top-1" /> */}
                          {menuItem.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className=" relative bottom-1  md:w-[30%]">
              <div
                onMouseEnter={() => setIsLog(true)}
                onMouseLeave={() => setIsLog(false)}
                className="md:flex  left-20 z-60  md:justify-end hidden   md:w-[100%] w-[100%]"
              >
                <div className=" m-1 md:mr-20 lg:mr-36  w-[100%] hidden md:flex md:justify-end  left-0">
                  {userName ? (
                    <div ref={dropdownRef}>
                      <span
                        onClick={() => setIsLog(!isLog)}
                        className="p-1 gap-1 cursor-pointer font-medium break-words  lg:text-lg md:text-sm lg:mr-5 flex  lg:gap-1 md:gap-0.5 relative z-60 "
                      >
                        {userName}{" "}
                        <IoMdArrowDropdown className="relative top-1.5" />
                      </span>
                      {isLog && (
                        <div
                          ref={boxRef}
                          className="bg-white rounded text-gray-900 absolute w-40  h-max mt-1 "
                        >
                          {role == "organizer" && (
                            <button
                              onClick={() => {
                                setIsLog(false);
                                navigate("/dashboard");
                              }}
                              className="flex gap-2 p-2 font-medium hover:text-white hover:bg-[#ff2459] w-full"
                            >
                              <MdDashboard className=" hover:text-white relative top-1" />
                              Dashboard
                            </button>
                          )}
                          <button
                           onClick={handleProfileClick}
                            className="flex gap-2 p-2 font-medium hover:text-white hover:bg-[#ff2459] w-full"
                          >
                            <CgProfile className=" hover:text-white relative top-1" />
                            Profile
                          </button>
                          {role == "user" && (
                            <button
                              onClick={() => {
                                setIsLog(false);
                                navigate("/myBookings");
                              }}
                              className="flex gap-2 p-2 font-medium hover:text-white hover:bg-[#ff2459] w-full"
                            >
                              <IoTicket className=" hover:text-white relative top-1" />
                              My Orders
                            </button>
                          )}
                          <button
                            onClick={() => {
                              handleLogOut();
                              setIsLog(false);
                              setUserName("");
                              window.location.reload();
                            }}
                            className="flex gap-2 p-2 font-medium hover:text-white hover:bg-[#ff2459] w-full"
                          >
                            <IoIosLogOut className=" hover:text-white relative top-1" />
                            Logout
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <Button
                      text={"Sign Up / Login "}
                      textSize={"text-base"}
                      width={"w-auto"}
                      rounded={"rounded"}
                      variant={"primary"}
                      onClick={() => navigate("/login")}
                    /> // Show Sign Up/Login button if no token or name
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {ShowPopup && <Sidebar setShowPopup={setShowPopup} />}
    </div>
  );
};

export default Header;
