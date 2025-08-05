import {
  IoLocationSharp,
  IoMenu,
  IoSearchSharp,
  IoTicket,
} from "react-icons/io5";
import { useState, useEffect, useRef } from "react";
import Button from "../Components/Button";
import Sidebar from "./Sidebar";
import {
  IoIosLogOut,
  IoIosPerson,
  IoMdArrowDropdown,
} from "react-icons/io";
import {
  MdDashboard,
  MdEvent,
  MdMiscellaneousServices,
} from "react-icons/md";
import { GrGroup } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { CiSearch } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import gsap from "gsap";
import axios from "axios";
import { toast } from "react-toastify";

const baseUrl = import.meta.env.VITE_API_URL;

const Header = () => {
  const navigate = useNavigate();
  const [showLocationPopup, setShowLocationPopup] = useState(false);
  const [ShowPopup, setShowPopup] = useState(false);
  const [userName, setUserName] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchDropdown, setSearchDropdown] = useState(false);
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");
  const [searchValue, setSearchValue] = useState("All");
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const itemRefs = useRef([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isLog, setIsLog] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const [currentLocation, setCurrentLocation] = useState("Select Location");
  const [headerVisible, setHeaderVisible] = useState(true);

  const desktopSearchBarContainerRef = useRef(null);
  const mobileSearchBarContainerRef = useRef(null);
  const desktopSearchDropdownRef = useRef(null);
  const locationPopupRef = useRef(null);
  const boxRef = useRef(null);
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  const authToken = localStorage.getItem("authToken");
  const role = localStorage.getItem("role");

  const metroCities = [
    {
      name: "Mumbai",
      state_name: "Maharashtra",
      country_name: "India",
      image:
        "https://images.unsplash.com/photo-1543157145-f78c636d023d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    },
    {
      name: "Delhi",
      state_name: "Delhi",
      country_name: "India",
      image:
        "https://images.unsplash.com/photo-1587474260584-136574528ed5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    },
    {
      name: "Bangalore",
      state_name: "Karnataka",
      country_name: "India",
      image:
        "https://images.unsplash.com/photo-1470004914212-05527e49370b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    },
    {
      name: "Chennai",
      state_name: "Tamil Nadu",
      country_name: "India",
      image:
        "https://images.unsplash.com/photo-1592903297149-37fb25202dfa?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    },
    {
      name: "Kolkata",
      state_name: "West Bengal",
      country_name: "India",
      image:
        "https://images.unsplash.com/photo-1584515933487-779824d29309?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    },
    {
      name: "Hyderabad",
      state_name: "Telangana",
      country_name: "India",
      image:
        "https://images.unsplash.com/photo-1581852057101-85a0b3d9b9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    },
    {
      name: "Pune",
      state_name: "Maharashtra",
      country_name: "India",
      image:
        "https://images.unsplash.com/photo-1634034379073-f689b460a3fc?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    },
    {
      name: "Ahmedabad",
      state_name: "Gujarat",
      country_name: "India",
      image:
        "https://images.unsplash.com/photo-1633424090571-c4a7b5d5edf2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    },
  ];

  const text_data = [
    {
      name: "Events",
      filterPath: "/filtered-events",
      path: "/events",
      icon: <MdEvent />,
      popUpMenu: [
        { name: "Business", path: "/events/business" },
        { name: "Festivals", path: "/events/festivals" },
        { name: "Live Music", path: "/events/live-music" },
        { name: "Nightlife & Club", path: "/events/nightlife-and-club" },
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
  ];

  const handleShowAlert = () => setShowPopup(true);

  const handleProfileClick = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/login");
      return;
    }
    try {
      const response = await axios.get(`${baseUrl}/api/user`, {
        headers: { Authorization: `${token}` },
      });
      if (response.data.status) {
        localStorage.setItem("userProfile", JSON.stringify(response.data.data));
        setIsLog(false);
        navigate("/profile");
      } else {
        toast.error(response.data.message || "Failed to fetch profile.");
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      toast.error(
        error.response?.data?.message || error.message || "An error occurred."
      );
    }
  };

  const handleLogOut = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("isLogin");
    localStorage.removeItem("eventData");
    localStorage.removeItem("role");
    setUserName("");
    navigate("/home");
    toast.success("Logged out successfully!");
  };

  const handleLocationSelect = (locationString) => {
    const cityOnly = locationString.split(",")[0].trim();
    setQuery(cityOnly);
    setSearchValue(cityOnly);
    setCurrentLocation(cityOnly);
    setShowLocationPopup(false);
    navigate(`/city/location?location=${encodeURIComponent(cityOnly)}`);
    gsap.to(locationPopupRef.current, {
      scale: 0.9,
      opacity: 0,
      duration: 0.2,
      ease: "power2.in",
      onComplete: () => setShowLocationPopup(false),
    });
  };

  const handleSelectSearch = (item) => {
    setSearch(item.name);
    const formattedCategory =
      item.eventCategory?.toLowerCase().replace(/\s+/g, "-") || "general";

    switch (item.categoryGroup) {
      case "events":
        navigate(`/events/${formattedCategory}/${item._id}`, {
          state: item._id,
        });
        break;
      case "organizers":
        navigate(`/organizer/${item._id}`);
        break;
      case "performers":
        navigate(`/performer/${item._id}`);
        break;
      case "services":
        navigate(`/service/${item._id}`);
        break;
      case "venues":
        navigate(`/venue/${item._id}`);
        break;
      default:
        console.warn("Unknown category:", item.categoryGroup);
        break;
    }
    setSearchDropdown(false);
    setSearchResults([]);
    setIsSearchExpanded(false);
  };

  const handleSearchIconClick = () => {
    setIsSearchExpanded((prev) => !prev);
    if (!isSearchExpanded) {
      setTimeout(() => {
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
      }, 100);
    } else {
      setSearch("");
      setSearchResults([]);
      setSearchDropdown(false);
    }
  };

  const handleLocationIconClick = () => {
    setShowLocationPopup(true);
    setQuery("");
    gsap.from(locationPopupRef.current, {
      scale: 0.8,
      opacity: 0,
      duration: 0.3,
      ease: "back.out(1.2)",
    });
  };

  useEffect(() => {
    let categoryToSet = selectedCategory;
    switch (selectedCategory) {
      case "Business":
        categoryToSet = "business & seminars";
        break;
      case "Festivals":
        categoryToSet = "festivals";
        break;
      case "Live Music":
        categoryToSet = "live music";
        break;
      case "Nightlife and club":
        categoryToSet = "nightlife & club";
        break;
      case "Professional":
        categoryToSet = "professional";
        break;
      case "Social":
        categoryToSet = "social";
        break;
      case "Sport & Leisure":
        categoryToSet = "sport & leisure";
        break;
      case "Theatre & Arts":
        categoryToSet = "theatre & arts";
        break;
      case "all":
        categoryToSet = "all";
        break;
      default:
        localStorage.removeItem("selectedCategory");
        break;
    }
    if (categoryToSet) {
      localStorage.setItem("selectedCategory", categoryToSet);
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (authToken) {
      try {
        const decodedToken = jwt_decode(authToken);
        if (decodedToken?.name) {
          setUserName(decodedToken.name);
        }
        if (decodedToken?.role) {
          localStorage.setItem("role", decodedToken.role);
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        handleLogOut();
      }
    }
  }, [authToken]);

  useEffect(() => {
    if (highlightedIndex >= 0 && itemRefs.current[highlightedIndex]) {
      itemRefs.current[highlightedIndex].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [highlightedIndex]);

  useEffect(() => {
    if (isLog && boxRef.current) {
      gsap.from(boxRef.current, {
        y: 100,
        opacity: 0,
        duration: 0.5,
        ease: "power3.out",
      });
    }
  }, [isLog]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsLog(false);
      }
      if (
        locationPopupRef.current &&
        !locationPopupRef.current.contains(event.target)
      ) {
        gsap.to(locationPopupRef.current, {
          scale: 0.9,
          opacity: 0,
          duration: 0.2,
          onComplete: () => setShowLocationPopup(false),
        });
      }
      if (
        (desktopSearchBarContainerRef.current &&
          !desktopSearchBarContainerRef.current.contains(event.target)) &&
        (mobileSearchBarContainerRef.current &&
          !mobileSearchBarContainerRef.current.contains(event.target)) &&
        (desktopSearchDropdownRef.current &&
          !desktopSearchDropdownRef.current.contains(event.target)) &&
        event.target !== document.getElementById("desktop-search-icon") &&
        event.target !== document.getElementById("mobile-search-icon")
      ) {
        setIsSearchExpanded(false);
        setSearchDropdown(false);
        setSearch("");
        setSearchResults([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchValue.length > 0 && searchValue !== "All") {
        try {
          const response = await axios.get(
            `${baseUrl}/location/locationSuggestions?search=${searchValue}`
          );
          setSuggestions(response.data || []);
        } catch (error) {
          console.error("Error fetching location suggestions:", error);
          setSuggestions([]);
        }
      } else {
        setSuggestions([]);
      }
    };

    const debounceTimeout = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounceTimeout);
  }, [searchValue]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (search.length === 0) {
        setSearchResults([]);
        setSearchDropdown(false);
        return;
      }
      try {
        const response = await axios.get(`${baseUrl}/search?query=${search}`);
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
        setSearchDropdown(filterData.length > 0);
      } catch (error) {
        console.error("Error fetching Search Results:", error);
        setSearchResults([]);
        setSearchDropdown(false);
      }
    };
    const debounceTimeout = setTimeout(fetchSearchResults, 300);
    return () => clearTimeout(debounceTimeout);
  }, [search]);

  return (
    
      <div className="bg-gray-900 text-white p-1 fixed w-full z-40">
        <div className="flex w-full h-[80px] items-center justify-between bg-opacity-50 px-4 relative gap-4">
          {/* Logo and Mobile Location Icon */}
          <div className="flex items-center gap-2 lg:gap-0 flex-shrink-0">
            <img
            src="/assets/staticAssets/logo.png"
            className="lg:w-[150px] md:w-[120px] w-[100px] cursor-pointer"
            alt="logo"
            onClick={() => navigate("/home")}
          />
          <div
            className="lg:hidden flex items-center gap-1 cursor-pointer group"
            onClick={handleLocationIconClick}
          >
            <IoLocationSharp className="text-white text-xl group-hover:text-[#ff2459] transition-colors" />
            <span className="text-sm font-medium group-hover:text-[#ff2459] transition-colors">
              {currentLocation.length > 10
                ? `${currentLocation.substring(0, 10)}...`
                : currentLocation}
            </span>
          </div>
        </div>

        {/* Desktop Location Selector */}
        <div
          className="hidden lg:flex items-center gap-2 cursor-pointer group relative"
          onClick={handleLocationIconClick}
        >
          <div className="relative">
            <IoLocationSharp className="text-white text-2xl group-hover:text-[#ff2459] transition-colors" />
            <span className="absolute -top-1 -right-1 bg-[#ff2459] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              <span className="relative -top-px">⌵</span>
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-gray-300 group-hover:text-white">
              Your Location
            </span>
            <span className="font-medium group-hover:text-[#ff2459] transition-colors">
              {currentLocation}
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="hidden lg:flex items-center gap-6 flex-grow justify-center">
          {text_data.map((item, index) => (
            <div
              key={index}
              className="relative pb-2"
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              <button
                className="font-medium text-lg flex items-center gap-1 relative z-60 text-white hover:text-[#ff2459] transition-colors duration-200"
                onClick={() => {
                  navigate(item.path);
                  if (item.path === "/events") {
                    setSelectedCategory("all");
                  }
                }}
              >
                <span className="relative top-0.5">{item.icon}</span> {item.name}
              </button>

              {activeIndex === index && item.popUpMenu && (
                <div
                  ref={boxRef}
                  className="bg-white rounded-lg text-gray-900 absolute top-full left-1/2 -translate-x-1/2 h-max mt-1 shadow-lg z-50 min-w-[180px]"
                >
                  {item.popUpMenu.map((menuItem, menuIndex) => (
                    <button
                      key={menuIndex}
                      onClick={() => {
                        setSelectedCategory(menuItem.name);
                        navigate(menuItem.path, { state: menuItem.name });
                      }}
                      className="flex justify-start gap-2 p-2.5 font-medium hover:text-white whitespace-nowrap hover:bg-[#ff2459] w-full text-left transition-colors duration-200"
                    >
                      {menuItem.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Desktop Search */}
        <div className="hidden lg:flex items-center flex-shrink-0 relative">
          <div
            ref={desktopSearchBarContainerRef}
            className={`absolute right-0 top-1/2 transform -translate-y-1/2 z-50 flex items-center bg-gray-100 rounded-lg shadow-md transition-all duration-300 ease-in-out
                ${isSearchExpanded
                ? "w-96 px-4 py-2 opacity-100"
                : "w-0 px-0 py-0 opacity-0 overflow-hidden"
              }`}
          >
            {isSearchExpanded && (
              <>
                <IoSearchSharp className="text-gray-700 text-xl mr-2" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search events, organizers..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setHighlightedIndex(-1);
                  }}
                  onKeyDown={(e) => {
                    if (!searchResults.length) return;
                    switch (e.key) {
                      case "ArrowDown":
                        e.preventDefault();
                        setHighlightedIndex((prev) =>
                          (prev + 1) % searchResults.length
                        );
                        break;
                      case "ArrowUp":
                        e.preventDefault();
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
                  className="flex-1 bg-transparent outline-none text-gray-700"
                />
                <button
                  onClick={() => {
                    setIsSearchExpanded(false);
                    setSearch("");
                    setSearchResults([]);
                    setSearchDropdown(false);
                  }}
                  className="text-gray-500 ml-2 hover:text-gray-700"
                >
                  ✕
                </button>
              </>
            )}
          </div>
          <button
            id="desktop-search-icon"
            onClick={handleSearchIconClick}
            className="p-2 rounded-lg hover:bg-gray-600 transition-colors flex-shrink-0"
          >
            <IoSearchSharp className="text-white text-xl" />
          </button>

          {searchDropdown && searchResults.length > 0 && isSearchExpanded && (
            <ul
              ref={desktopSearchDropdownRef}
              className="absolute z-60 bg-white text-black border mt-1 rounded-lg w-96 max-h-48 overflow-y-auto shadow-md top-[calc(100%+0.5rem)] right-0"
            >
              {searchResults.map((item, index) => (
                <li
                  key={item._id}
                  ref={(el) => (itemRefs.current[index] = el)}
                  onMouseDown={() => handleSelectSearch(item)}
                  className={`px-4 py-2 cursor-pointer hover:bg-gray-200 ${index === highlightedIndex ? "bg-gray-300 font-semibold" : ""
                    }`}
                >
                  <span className="font-medium">{item.name}</span>{" "}
                  <span className="text-gray-500 text-sm">— {item.category}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Create Buttons */}
        <div className="lg:flex hidden gap-2 flex-shrink-0">
          <Button
            text={"Create Event"}
            rounded={"rounded-lg"}
            variant={"primary"}
            onClick={() => navigate("/create-event")}
          />
          <Button
            text={"Create Page"}
            rounded={"rounded-lg"}
            variant={"primary"}
            onClick={() => navigate("/create-page")}
          />
        </div>

        {/* User Profile */}
        <div
          onMouseEnter={() => setIsLog(true)}
          onMouseLeave={() => setIsLog(false)}
          className="relative flex items-center flex-shrink-0 text-white"
        >
          {userName ? (
            <div ref={dropdownRef} className="relative hidden lg:block">
              <span
                onClick={() => setIsLog(!isLog)}
                className="p-1 gap-1 cursor-pointer font-medium break-words lg:text-lg md:text-sm flex lg:gap-1 md:gap-0.5 relative z-60 hover:text-[#ff2459] transition-colors items-center"
              >
                {userName} <IoMdArrowDropdown className="text-lg" />
              </span>
              {isLog && (
                <div
                  ref={boxRef}
                  className="bg-white rounded-lg text-gray-900 absolute w-40 h-max mt-1 right-0 shadow-lg z-50"
                >
                  {role === "organizer" && (
                    <button
                      onClick={() => {
                        setIsLog(false);
                        navigate("/dashboard");
                      }}
                      className="flex gap-2 p-2 font-medium hover:text-white hover:bg-[#ff2459] w-full text-left transition-colors duration-200"
                    >
                      <MdDashboard className="hover:text-white relative top-1" />
                      Dashboard
                    </button>
                  )}
                  <button
                    onClick={handleProfileClick}
                    className="flex gap-2 p-2 font-medium hover:text-white hover:bg-[#ff2459] w-full text-left transition-colors duration-200"
                  >
                    <CgProfile className="hover:text-white relative top-1" />
                    Profile
                  </button>

                  {role === "superadmin" && (
                    <button
                      onClick={() => {
                        setIsLog(false);
                        
                        navigate("/admin-panel");
                      }}
                      className="flex gap-2 p-2 font-medium hover:text-white hover:bg-[#ff2459] w-full"
                    >
                      🛠 Admin Panel
                    </button>
                  )}
                  {/* <button
                    onClick={handleProfileClick}
                    className="flex gap-2 p-2 font-medium hover:text-white hover:bg-[#ff2459] w-full text-left transition-colors duration-200"
                  >
                    <CgProfile className="hover:text-white relative top-1" />
                    Profile
                  </button> */}

                  {role === "user" && (
                    <button
                      onClick={() => {
                        setIsLog(false);
                        navigate("/myBookings");
                      }}
                      className="flex gap-2 p-2 font-medium hover:text-white hover:bg-[#ff2459] w-full text-left transition-colors duration-200"
                    >
                      <IoTicket className="hover:text-white relative top-1" />
                      My Orders
                    </button>
                  )}
                  <button
                    onClick={() => {
                      handleLogOut();
                      setIsLog(false);
                      setUserName("");
                    }}
                    className="flex gap-2 p-2 font-medium hover:text-white hover:bg-[#ff2459] w-full text-left transition-colors duration-200"
                  >
                    <IoIosLogOut className="hover:text-white relative top-1" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <CgProfile
              className="text-white text-3xl cursor-pointer hover:text-[#ff2459] transition-colors hidden lg:block"
              onClick={() => navigate("/login")}
            />
          )}
        </div>

        {/* Mobile Menu */}
        <div className="flex items-center gap-4 lg:hidden">
          {isSearchExpanded && (
            <div
              ref={mobileSearchBarContainerRef}
              className="flex items-center bg-gray-100 rounded-lg shadow-md px-2 py-1 flex-grow absolute left-4 right-4 z-50 text-gray-700"
            >
              <IoSearchSharp className="text-gray-700 text-xl mr-2" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search events, organizers..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setHighlightedIndex(-1);
                }}
                onKeyDown={(e) => {
                  if (!searchResults.length) return;
                  switch (e.key) {
                    case "ArrowDown":
                      e.preventDefault();
                      setHighlightedIndex((prev) =>
                        (prev + 1) % searchResults.length
                      );
                      break;
                    case "ArrowUp":
                      e.preventDefault();
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
                className="flex-1 bg-transparent outline-none text-gray-700"
              />
              <button
                onClick={() => {
                  setIsSearchExpanded(false);
                  setSearch("");
                  setSearchResults([]);
                  setSearchDropdown(false);
                }}
                className="text-gray-500 ml-2 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
          )}

          <button
            id="mobile-search-icon"
            onClick={handleSearchIconClick}
            className="block text-2xl p-1 rounded-lg hover:bg-gray-600 transition-colors"
          >
            <CiSearch />
          </button>
          <div
            className="relative z-20 block text-4xl sm:font-medium font-normal sm:text-2xl cursor-pointer hover:text-[#ff2459] transition-colors"
            onClick={handleShowAlert}
          >
            <IoMenu />
          </div>
        </div>
      </div>

      {/* Mobile Search Dropdown */}
      {searchDropdown && searchResults.length > 0 && isSearchExpanded && (
        <ul className="lg:hidden absolute z-50 bg-white text-black border rounded-lg max-h-48 overflow-y-auto shadow-md w-[calc(100%-2rem)] left-4 top-[70px]">
          {searchResults.map((item, index) => (
            <li
              key={item._id}
              ref={(el) => (itemRefs.current[index] = el)}
              onMouseDown={() => handleSelectSearch(item)}
              className={`px-4 py-2 cursor-pointer hover:bg-gray-200 ${index === highlightedIndex ? "bg-gray-300 font-semibold" : ""
                }`}
            >
              <span className="font-medium">{item.name}</span>{" "}
              <span className="text-gray-500 text-sm">— {item.category}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Enhanced Location Popup */}
      {showLocationPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 backdrop-blur-sm">
          <div
            ref={locationPopupRef}
            className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 w-full max-w-md mx-4 shadow-2xl border border-gray-700 overflow-hidden"
          >
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-2xl font-bold text-white">Choose Location</h3>
                <p className="text-gray-400 text-sm">Find events near you</p>
              </div>
              <button
                onClick={() => {
                  gsap.to(locationPopupRef.current, {
                    scale: 0.9,
                    opacity: 0,
                    duration: 0.2,
                    onComplete: () => setShowLocationPopup(false),
                  });
                }}
                className="text-gray-400 hover:text-white text-2xl transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="relative mb-6">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <IoLocationSharp className="text-gray-500" />
              </div>
              <input
                type="text"
                placeholder="Search for a city..."
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSearchValue(e.target.value);
                }}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#ff2459] focus:border-transparent transition-all"
              />
            </div>

            {!query && (
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <span className="bg-[#ff2459] w-1 h-5 rounded-full"></span>
                  Popular Cities
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {metroCities.map((city, index) => (
                    <button
                      key={index}
                      onClick={() =>
                        handleLocationSelect(
                          `${city.name}, ${city.state_name}, ${city.country_name}`
                        )
                      }
                      className="relative group overflow-hidden rounded-lg h-24 transition-all hover:scale-[1.02]"
                    >
                      <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-20 transition-all"></div>
                      <img
                        src={city.image}
                        alt={city.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80";
                        }}
                      />
                      <div className="absolute bottom-0 left-0 p-3 w-full text-left">
                        <h5 className="font-bold text-white text-shadow">
                          {city.name}
                        </h5>
                        <p className="text-xs text-gray-300">
                          {city.state_name}
                        </p>
                      </div>
                      <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#ff2459] rounded-lg transition-all pointer-events-none"></div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {suggestions.length > 0 && (
              <div className="max-h-60 overflow-y-auto">
                <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <span className="bg-[#ff2459] w-1 h-5 rounded-full"></span>
                  Search Results
                </h4>
                <ul className="space-y-2">
                  {suggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      onClick={() =>
                        handleLocationSelect(
                          `${suggestion.name}, ${suggestion.state_name}, ${suggestion.country_name}`
                        )
                      }
                      className="px-4 py-3 bg-gray-800 hover:bg-gray-700 cursor-pointer rounded-lg transition-colors flex items-center gap-3"
                    >
                      <div className="bg-[#ff2459] bg-opacity-20 p-2 rounded-full">
                        <IoLocationSharp className="text-[#ff2459]" />
                      </div>
                      <div>
                        <h5 className="font-medium text-white">
                          {suggestion.name}
                        </h5>
                        <p className="text-xs text-gray-400">
                          {suggestion.state_name}, {suggestion.country_name}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {query && suggestions.length === 0 && (
              <div className="text-center py-8">
                <IoLocationSharp className="text-gray-600 text-4xl mx-auto mb-3" />
                <h4 className="text-gray-400 font-medium">No locations found</h4>
                <p className="text-gray-500 text-sm mt-1">
                  Try searching for another city
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {ShowPopup && <Sidebar setShowPopup={setShowPopup} />}
    </div>

    
  );
};

export default Header;