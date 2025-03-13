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
  useEffect(() => {
    dispatch(getRecentlyViewData(setLoading)); // Call API when component mounts
  }, [dispatch]);

  const store = useSelector((state) => state.getRecentlyViewReducer) || {
    eventData: [],
  };
  const data = store.eventData;
  // const card1 = [
  //   { img: "fI1.png", desc: "MUSIC CONCERT AT UK| ALL GABHD..." },
  //   { img: "fI2.png", desc: "LIVE DANCE EVENT|ALL BIG CELEBS.." },
  //   { img: "fI3.png", desc: "GIRLS PARTY AT MSG Tower..." },
  //   { img: "fI3.png", desc: "GIRLS PARTY AT MSG Tower..." },
  //   { img: "fI3.png", desc: "GIRLS PARTY AT MSG Tower..." },
  //   { img: "fI2.png", desc: "LIVE DANCE EVENT|ALL BIG CELEBS.." },
  // ];
  const navigate = useNavigate();
  if (loading) {
    return <Loading />;
  }
  return (
    <div
      className="flex flex-col p-2 lg:pt-5 mb-2 mt-4"
      style={{ fontFamily: "Nunito" }}
    >
      <div className="flex justify-between items-center">
        <div className="flex gap-4 items-center lg:pl-[105px] md:pl-4">
          <IoIosTimer className="text-3xl" />
          <div>
            <p className="lg:text-2xl text-lg font-bold">RECENTLY VIEWED</p>
            <p>Pick up where you left off</p>
          </div>
        </div>
        {data.length > 6 && (
          <div className="flex gap-2 relative lg:right-32">
            Swipe
            <FaArrowAltCircleRight size={20} />
          </div>
        )}
      </div>
      {/* <div className="flex gap-3 p-3 justify-center items-center"> */}
      <div className="flex gap-5 lg:ml-[100px] overflow-x-auto p-2 scrollbar-hide max-w-7xl">
        {data &&
          data.slice(0, 5).map((item, index) => {
            return (
              <div
                key={index}
                className="flex-none cursor-pointer shadow-lg p-2 rounded-lg lg:w-[250px] w-56"
                onClick={() => navigate("/featuredEvent", { state: item._id })}
              >
                <img
                  src={item.media.thumbnailImage}
                  className="h-24 lg:h-32 md:h-32 w-full lg:pb-0   rounded-lg"
                  alt=""
                />
                <p className="font-semibold text-gray-700 lg:text-sm text-xs  pt-3  lg:break-words">
                  {item.name}
                </p>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default RecentView;
