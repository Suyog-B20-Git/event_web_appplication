import React, { useEffect, useState, useRef } from 'react';
import { FaFacebook, FaInstagram, FaSquareXTwitter } from 'react-icons/fa6';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from "axios";
import { normalizeImageUrl } from "../utility/urlUtils";
const baseUrl = import.meta.env.VITE_API_URL;

const CATEGORY_TITLES = {
  organizers: "Organizers",
  venues: "Venues",
  performers: "Performers",
};

const SearchData = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [hasData, setHasData] = useState(true);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const city = searchParams.get("location");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      if (!city) {
        setLoading(false);
        setHasData(false);
        return;
      }

      try {
        const isDefault = !city || city.toLowerCase() === "all";
        const url = isDefault
          ? `${baseUrl}/api/search/detail?query=all`
          : `${baseUrl}/api/search/detail?query=${encodeURIComponent(city)}`;

        const response = await axios.get(url);
        if (response.data?.status && response.data.data) {
          setData(response.data.data);
          setData(response.data.data);
          const hasAnyData = Object.values(response.data.data).some(array => array && array.length > 0);
          setHasData(hasAnyData);
        } else {
          setHasData(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setHasData(false);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [city]);

  const scrollRef = useRef({});

  const scrollHorizontally = (key, direction) => {
    const container = scrollRef.current[key];
    if (container) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleCardClick = (key, item) => {
    switch (key.toLowerCase()) {
      case "events":
        navigate(`/events/${item._id}`);
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
  };

  const renderCategorySection = (key, items) => {
    if (!items || items.length === 0) return null;

    return (
      <div key={key} className="mb-10 mt-5">
        <h2 className="text-2xl font-bold uppercase mb-4">{CATEGORY_TITLES[key] || key}</h2>
        <div className="flex gap-9 overflow-x-auto lg:p-4 pt-2 relative lg:right-46 w-full">
          {items.slice(0, Math.max(3, items.length)).map((item, index) => (
            <div
              key={index}
              className="min-w-[300px] max-w-[320px] flex-shrink-0 flex flex-col pb-5 shadow-md items-center justify-between rounded border bg-white"
            >
              <div
                onClick={() => handleCardClick(key, item)}
                className="h-40 md:h-36 lg:h-40 w-full overflow-hidden flex items-center justify-center cursor-pointer"
              >
                <img
                  src={
                    item.profileImage
                      ? normalizeImageUrl(item.profileImage) || "/assets/staticAssets/fallback-image.jpg"
                      : "/assets/staticAssets/fallback-image.jpg"
                  }
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-125"
                  alt={item.name}
                />
              </div>
              <div
                onClick={() => handleCardClick(key, item)}
                className="p-2 cursor-pointer"
              >
                <h1 className="font-medium text-lg capitalize">{item.name}</h1>
                <section className="text-sm text-gray-500">
                  {item.address}, {item.city}, {item.state}
                </section>
              </div>

              <div className="flex justify-between w-full px-3">
                <div className="flex gap-2 text-lg">
                  {item.facebookUrl && (
                    <a href={item.facebookUrl} target="_blank" rel="noreferrer">
                      <FaFacebook className="text-red-500" />
                    </a>
                  )}
                  {item.instagramUrl && (
                    <a href={item.instagramUrl} target="_blank" rel="noreferrer">
                      <FaInstagram className="text-red-500" />
                    </a>
                  )}
                  {item.twitterUrl && (
                    <a href={item.twitterUrl} target="_blank" rel="noreferrer">
                      <FaSquareXTwitter className="text-red-500" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const NoResultsMessage = () => (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '50vh',
      }}
    >
      <p style={{ fontSize: '1.5rem', fontWeight: '100', color: 'black' }}>
        No results found
      </p>
    </div>
  );

  return (
    <div style={{ padding: '20px', minHeight: '50vh' }}>
      {loading ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '50vh',
          }}
        >
          <p style={{ fontSize: '1.2rem', fontStyle: 'italic', color: '#888' }}>
            Loading...
          </p>
        </div>
      ) : !hasData ? (
        <NoResultsMessage />
      ) : (
        Object.entries(data).map(([key, items]) => renderCategorySection(key, items))
      )}
    </div>
  );
};

export default SearchData;