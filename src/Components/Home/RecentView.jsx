import React, { useEffect, useState } from "react";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { IoIosTimer } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { getRecentlyViewData } from "../../redux/actions/master/Events/RecentlyView";
import Loading from "../Loading";
import { useNavigate } from "react-router-dom";

function RecentView() {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const store = useSelector((state) => state.getRecentlyViewReducer) || {
    recentEventData: [],
  };
  useEffect(() => {
    dispatch(getRecentlyViewData(setLoading));
  }, [dispatch]);

  const data = store.recentEventData;

  const navigate = useNavigate();
  if (loading) {
    return <Loading />;
  }
return (
  <div className="flex justify-center items-center overflow-hidden">
    <div className="lg:p-12 lg:pt-10 pt-5 p-5 w-full max-w-[1340px]">
      {data.length > 0 && (
        <>
          {/* Heading */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex gap-2 items-center">
              <IoIosTimer className="text-2xl" />
              <div>
                <p className="font-bold font-sans lg:text-2xl">RECENTLY VIEWED</p>
                <p className="text-sm text-gray-600">Pick up where you left off</p>
              </div>
            </div>
          </div>

          {/* Responsive scroll on mobile, wrap on large screen */}
          <div className="lg:flex lg:flex-wrap lg:gap-6 hidden">
            {data.slice(0, 5).map((item, index) => (
              <div
                key={index}
                className="cursor-pointer shadow-lg p-2 rounded-lg w-56"
                onClick={() => navigate("/featuredEvent", { state: item._id })}
              >
                <img
                  src={item.media.thumbnailImage}
                  className="h-24 lg:h-32 w-full rounded-lg object-cover"
                  alt=""
                />
                <p className="font-semibold text-gray-700 text-sm pt-3 break-words">
                  {item.name}
                </p>
              </div>
            ))}
          </div>

          {/* Horizontal scroll for mobile */}
          <div className="lg:hidden overflow-x-auto w-full">
            <div className="flex flex-nowrap gap-4 w-max px-1">
              {data.slice(0, 5).map((item, index) => (
                <div
                  key={index}
                  className="flex-none cursor-pointer shadow-lg p-2 rounded-lg w-48 min-w-[192px]"
                  onClick={() => navigate("/featuredEvent", { state: item._id })}
                >
                  <img
                    src={item.media.thumbnailImage}
                    className="h-24 w-full rounded-lg object-cover"
                    alt=""
                  />
                  <p className="font-semibold text-gray-700 text-sm pt-3 break-words">
                    {item.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  </div>
);


}

export default RecentView;
