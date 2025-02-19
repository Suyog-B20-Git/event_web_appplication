/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { BsFire } from "react-icons/bs";
import { CiLocationOn } from "react-icons/ci";
import { FaEye } from "react-icons/fa";
import { MdEvent } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getEventData } from "../redux/actions/master/Events";
import Loading from "../Components/Loading";

function Viewall() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    dispatch(getEventData(setLoading)); // Call API when component mounts
  }, [dispatch]);
  const store = useSelector((state) => state.eventReducer) || { eventData: [] };
  const data = store.eventData;
  console.log(data);

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="flex lg:justify-start justify-center lg:pt-0 md:pt-4 pt-[87px] lg:relative left-[70px] items-center overflow-hidden">
      <div className="lg:p-12 lg:pb-5  pt-5 p-5 w-full max-w-[1340px]">
        <div className="flex justify-between">
          <div className="flex gap-2 lg:pl-3">
            <BsFire className="text-2xl relative top-1" />
            <p className="font-bold font-sans lg:text-2xl">ALL EVENTS</p>
          </div>
        </div>

        {/* Cards container with horizontal scrolling */}
        <div className="  grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:gap-9 gap-5  lg:p-4 pt-2 relative lg:right-46   w-full">
          {data.map((item, index) => (
            <div
              key={index}
              // className="flex-none shadow-lg p-2 rounded-lg lg:w-80 w-56"
              className="overflow-hidden flex-none  border  shadow-lg p-2 rounded-lg lg:w-[372px] w-57"
              // onClick={() => navigate("/featuredEvent", { state: item })}
            >
              <div
                style={{
                  // backgroundImage: `url(${item.media.thumbnailImage})`,
                  backgroundImage: `url(${
                    item.media?.thumbnailImage || "fallback-image.jpg"
                  })`,

                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                className=" h-24 lg:h-52 md:h-32 w-full rounded-lg p-2 flex justify-end"
              >
                <div className=" text-white bg-blue-300 rounded-xl lg:text-base text-xs   font-bold lg:px-3 lg:p-0 p-1 w-[max-content] h-[max-content]">
                  {item.category}
                </div>
              </div>
              <div>
                <div className="flex    font-medium  flex-col gap-2 p-2 lg:text-base text-xs">
                  <div className="">
                    {" "}
                    <p className="lg:text-xl overflow-x-hidden   text-base flex lg:flex-row flex-col justify-between">
                      {item.name}{" "}
                      <p className="flex gap-2 text-gray-500 lg:text-base text-xs  ">
                        <FaEye className="relative top-1 text-blue-600" />
                        <span>{item.visits}</span>
                      </p>
                    </p>
                    <p className="flex gap-2 text-gray-500 lg:text-base text-xs">
                      <MdEvent className="relative top-1" />
                      <span>{item.startDate}</span>
                    </p>
                    <p className="flex gap-2 text-gray-500 lg:text-base text-xs">
                      <CiLocationOn className="relative top-1" />
                      <span>
                        {item.venue?.city || "Pune"} -{" "}
                        {item.venue?.country || "India"}
                      </span>
                    </p>
                  </div>

                  <p className="mt-auto  flex lg:justify-between gap-4 items-center bg-[#F5FCFE] text-sm lg:text-sm p-2">
                    <span className="lg:text-sm text-xs">$1300 ONWARDS</span>
                    <button className="rounded shadow lg:p-2 p-2 lg:m-0 mr-1 lg:text-sm text-xs bg-white">
                      BUY NOW
                    </button>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Viewall;
