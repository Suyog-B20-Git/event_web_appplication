import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "../Loading";
import { getOrganizerById } from "../../redux/actions/master/Organizer/getOrganizerById";
import {
  MdKeyboardDoubleArrowRight,
  MdOutlineNavigateNext,
} from "react-icons/md";
import {
  FaEye,
  FaFacebookMessenger,
  FaInstagram,
  FaLocationDot,
  FaSquareFacebook,
  FaSquareXTwitter,
} from "react-icons/fa6";
import { IoFlagSharp, IoLogoWhatsapp } from "react-icons/io5";
import {
  CiCircleCheck,
  CiCircleInfo,
  CiHeart,
  CiMenuKebab,
} from "react-icons/ci";
import { BsCalendar2DateFill } from "react-icons/bs";

import { HiOutlineCalendarDateRange } from "react-icons/hi2";
import { CalendarCheck } from "lucide-react";
import MapContainer from "./Map";
import { FcLike } from "react-icons/fc";
import FacebookComments from "./FacebookComments";
import EnquiryForm from "./EnquiryForm";
import OwnerShipForm from "./OwnerShipForm";
import FacebookEmbeded from "../SocialMedia/Facebook";
import InstagramProfile from "../SocialMedia/Instagram";
import YouTubeProfile from "../SocialMedia/Youtube";
import TwitterEmbed from "../SocialMedia/TwiiterEmbed";
import PerformerStats from "../SocialMedia/State";

function GetOrganizerById() {
  const [isPopUp, setIsPopUp] = useState(false);
  const [category, setCategory] = useState("");
  const [enquiry, setEnquiry] = useState(false);
  const [ownership, setOwnership] = useState(false);
  const [about, setAbout] = useState(true);
  const [upcomimg, setUpcoming] = useState(false);
  const [facebook, setFacebook] = useState(false);
  const [twitter, setTwitter] = useState(false);
  const [instagram, setInstagram] = useState(false);
  const [stat, setStat] = useState(false);
  const [youtube, setYoutube] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const organizerId = location.state;
  console.log(organizerId);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const store = useSelector((state) => state.getOrganizerByIdReducer) || {
    organizerData: [],
  };

  const data = store.organizerData;
  console.log(data, "OrganizerData....");
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
    dispatch(getOrganizerById(organizerId, setLoading));
  }, [dispatch]);
  if (loading) {
    return <Loading />;
  }

  // useEffect(() => {
  //   if (!window.FB) {
  //     const script = document.createElement("script");
  //     script.src =
  //       "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v17.0";
  //     script.async = true;
  //     script.defer = true;
  //     document.body.appendChild(script);
  //   }
  // }, []);

  return (
    <div>
      <div className="flex lg:flex-row flex-col gap-10">
        <div className="lg:pt-3 pt-20 bg-gray-100 lg:w-[75%] lg:px-4 ">
          <div className="flex justify-between font-medium">
            <p className="hidden gap-2 p-3 lg:flex ">
              <p
                className="cursor-pointer hover:text-[#ff2459]"
                onClick={() => navigate("/home")}
              >
                Home
              </p>
              <MdKeyboardDoubleArrowRight className="text-lg top-1 relative" />
              <p className="hover:text-[#ff2459]">{data.city}</p>
              <MdKeyboardDoubleArrowRight className="text-lg top-1 relative" />
              <p
                className="cursor-pointer hover:text-[#ff2459]"
                onClick={() => {
                  navigate("/getOrganizer");
                }}
              >
                Organizer
              </p>
              <MdKeyboardDoubleArrowRight className="text-lg top-1 relative" />
              <p
                className="cursor-pointer text-[#ff2459] hover:text-[#ff2459]"
                onClick={() => navigate("/getOrganizerById", { state: data })}
              >
                {data.name}
              </p>
            </p>
            <p className="text-blue-400  lg:text-base text-xs lg:flex hidden gap-1 pt-3 p-3 pb-0 ">
              <FaEye className="relative top-1" />
              {data.visit} 4133 Visit, 9 visites today
            </p>
          </div>
          <div
            className=" text-white flex flex-col justify-around gap-4 lg:pt-10 pt-3 lg:px-8   lg:p-2"
            style={{
              backgroundImage:
                "radial-gradient( circle farthest-corner at 5.6% 54.5%,  rgba(47,71,79,1) 0%, rgba(159,188,198,1) 83.6% )",
            }}
          >
            <div className="flex flex-col gap-4 lg:px-0 px-2 ">
              <div className="flex justify-between">
                <h1
                  className="text-white  font-medium lg:text-4xl text-2xl"
                  style={{ textShadow: "1px 1px 1px black" }}
                >
                  {data.name}
                </h1>
                <button className="lg:hidden block">
                  <CiMenuKebab
                    onClick={() => setIsPopUp(!isPopUp)}
                    className="text-black text-2xl"
                  />
                </button>
              </div>
              <p className="text-sm lg:block hidden">
                Visited 4133 times,9 visites today
              </p>
            </div>
            <div className="flex gap-2 lg:px-0 px-2 lg:p-0  p-2">
              <p>
                <FaLocationDot
                  className="text-red-500 relative top-1 "
                  style={{ textShadow: "1px 1px 1px black" }}
                />
              </p>
              <p>
                {data.city},{data.state},{data.country}
              </p>
            </div>
            <div className=" lg:flex hidden w-full justify-end p-1 cursor-pointer ">
              <div className="bg-white text-gray-900 w-max p-2 lg:text-base text-xs px-3 flex lg:gap-4 gap-1 rounded-full">
                <p
                  className="flex gap-1 hover:text-[#ff2459] "
                  onClick={() => setOwnership(!ownership)}
                >
                  <IoFlagSharp className="relative top-1 lg:text-base text-xs" />{" "}
                  Claim Ownership
                </p>
                <p
                  className="flex gap-1 bg-white text-gray-900"
                  onClick={() => setEnquiry(!enquiry)}
                >
                  <CiCircleInfo className="relative top-1 lg:text-base text-xs" />
                  Send Inquiry
                </p>
                <p className="flex gap-1 bg-white text-gray-900">
                  <CiHeart className="relative top-1 lg:text-base text-xs" />{" "}
                  Favourite
                </p>
              </div>
            </div>
          </div>
          {isPopUp && (
            <div className="lg:hidden block">
              <div className="fixed w-full inset-0 flex flex-col items-center justify-center  overflow-y-scroll  z-40 backdrop-blur-sm">
                <div className="bg-white rounded-lg   shadow-lg  lg:w-full">
                  <div className="  flex flex-col gap-4  px-0 h-[170px] w-[300px] border rounded">
                    <button
                      className="flex  gap-3 p-4  px-4 hover:text-white hover:bg-[#ff2459] "
                      onClick={() => {
                        setOwnership(!ownership);
                        setIsPopUp(!isPopUp);
                      }}
                    >
                      {" "}
                      <IoFlagSharp className="relative top-1 lg:text-base " />
                      Claim Ownership
                    </button>
                    <button
                      className="flex gap-3 p-4  px-4 bg-white text-gray-900 hover:text-white hover:bg-[#ff2459]"
                      onClick={() => {
                        setEnquiry(!enquiry);
                        setIsPopUp(!isPopUp);
                      }}
                    >
                      {" "}
                      <CiCircleInfo className="relative top-1 lg:text-base  " />
                      Send Enquiry
                    </button>
                    <button
                      className="flex gap-3 p-4 px-4 bg-white text-gray-900 hover:text-white hover:bg-[#ff2459]"
                      onClick={() => {
                        setIsPopUp(!isPopUp);
                      }}
                    >
                      {" "}
                      <CiHeart className="relative top-1 lg:text-base " /> Add
                      Favourite
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className=" flex lg:flex-row flex-col p-3 ">
            <div className="flex lg:w-[30%] justify-center items-center flex-col gap-3 lg:p-10">
              <img
                src={data.profileImage}
                className="h-32 lg:h-56 lg:w-56 w-full border-2 "
                alt=""
              />
              <div className=" lg:flex gap-2 hidden justify-center">
                <button className="px-2 lg:flex hidden gap-1 bg-gray-200 rounded-full p-1 lg:text-base text-sm ">
                  <CiCircleCheck className="relative top-1 lg:text-lg" />
                  Follow
                </button>
                <div className="flex   gap-5 ">
                  <button className="text-red-500 text-2xl">
                    <a
                      className="flex"
                      href={data.instagramUrl ? data.instagramUrl : ""}
                    >
                      {data.instagramUrl ? (
                        <FaInstagram className=" text-red-500" />
                      ) : (
                        ""
                      )}
                    </a>
                  </button>
                  <button className="text-red-500 text-2xl">
                    <a href={data.facebookmUrl ? data.facebookUrl : ""}>
                      {data.facebookUrl ? (
                        <FcLike className="text-red-500" />
                      ) : (
                        ""
                      )}
                    </a>
                  </button>
                  <button className="text-red-500 text-2xl">
                    <a href={data.twitterUrl ? data.twitterUrl : ""}>
                      {data.twitterUrl ? (
                        <FaSquareXTwitter className="text-red-500" />
                      ) : (
                        ""
                      )}
                    </a>
                  </button>
                </div>
              </div>
            </div>
            <div className="flex lg:hidden gap-4 p-1">
              <button className="px-2 lg:hidden mb-2 flex w-max mt-2 gap-1 bg-gray-200 rounded-full p-1 lg:text-base text-sm ">
                <CiCircleCheck className="relative top-1 lg:text-lg" />
                Follow
              </button>
              <div className="flex   gap-5 ">
                <button className="text-red-500 text-2xl">
                  <a
                    className="flex"
                    href={data.instagramUrl ? data.instagramUrl : ""}
                  >
                    {data.instagramUrl ? (
                      <FaInstagram className=" text-red-500" />
                    ) : (
                      ""
                    )}
                  </a>
                </button>
                <button className="text-red-500 text-2xl">
                  <a href={data.facebookmUrl ? data.facebookUrl : ""}>
                    {data.facebookUrl ? (
                      <FcLike className="text-red-500" />
                    ) : (
                      ""
                    )}
                  </a>
                </button>
                <button className="text-red-500 text-2xl">
                  <a href={data.twitterUrl ? data.twitterUrl : ""}>
                    {data.twitterUrl ? (
                      <FaSquareXTwitter className="text-red-500" />
                    ) : (
                      ""
                    )}
                  </a>
                </button>
              </div>
            </div>
            <div className="lg:w-[70%]  h-[300px] overflow-scroll scrollbar-hide">
              <div className="text-gray-500 lg:text-base text-sm lg:w-full w-full lg:relative overflow-x-scroll scrollbar-hide  bg-white  flex border   md:gap-20 gap-5  lg:gap-16 font-medium lg:px-10 lg:p-0 p-2  ">
                <button
                  className={`px-2 ${
                    about ? "border-b-2 border-b-red-600" : ""
                  }`}
                  onClick={() => {
                    setAbout(true);
                    setUpcoming(false);
                    setFacebook(false);
                    setTwitter(false);
                    setInstagram(false);
                    setYoutube(false);
                    setStat(false);
                  }}
                >
                  ABOUT
                </button>
                <button
                  className={`${
                    upcomimg ? "border-b-2 border-b-red-600" : ""
                  } p-2`}
                  onClick={() => {
                    setAbout(false);
                    setUpcoming(true);
                    setFacebook(false);
                    setTwitter(false);
                    setInstagram(false);
                    setYoutube(false);
                    setStat(false);
                  }}
                >
                  UPCOMING EVENT
                </button>
                <button
                  className={`${
                    facebook ? "border-b-2 border-b-red-600" : ""
                  } p-2 lg:px-0 px-4`}
                  onClick={() => {
                    setAbout(false);
                    setUpcoming(false);
                    setFacebook(true);
                    setTwitter(false);
                    setInstagram(false);
                    setYoutube(false);
                    setStat(false);
                  }}
                >
                  FACEBOOK
                </button>
                <button
                  className={`${
                    twitter ? "border-b-2 border-b-red-600" : ""
                  } p-2 lg:px-0 px-4`}
                  onClick={() => {
                    setAbout(false);
                    setUpcoming(false);
                    setFacebook(false);
                    setTwitter(true);
                    setInstagram(false);
                    setYoutube(false);
                    setStat(false);
                  }}
                >
                  TWITTER
                </button>
                <button
                  className={`${
                    instagram ? "border-b-2 border-b-red-600" : ""
                  } p-2 lg:px-0 px-4`}
                  onClick={() => {
                    setAbout(false);
                    setUpcoming(false);
                    setFacebook(false);
                    setTwitter(false);
                    setInstagram(true);
                    setYoutube(false);
                    setStat(false);
                  }}
                >
                  INSTAGRAM
                </button>
                <button
                  className={`${
                    youtube ? "border-b-2 border-b-red-600" : ""
                  } p-2 lg:px-0 px-4`}
                  onClick={() => {
                    setAbout(false);
                    setUpcoming(false);
                    setFacebook(false);
                    setTwitter(false);
                    setInstagram(false);
                    setYoutube(true);
                    setStat(false);
                  }}
                >
                  YOUTUBE
                </button>
                <button
                  className={`${
                    stat ? "border-b-2 border-b-red-600" : ""
                  } p-2 lg:px-0 px-4`}
                  onClick={() => {
                    setAbout(false);
                    setUpcoming(false);
                    setFacebook(false);
                    setTwitter(false);
                    setInstagram(false);
                    setYoutube(false);

                    setStat(true);
                  }}
                >
                  STAT
                </button>
              </div>
              <div className="lg:px-10 px-2 border bg-white ">
                <p className="pt-5 ">
                  {/* {about ? data.description : ""} */}
                  {about
                    ? " Lorem ipsum, dolor sit amet consectetur adipisicing elit. Omnis amet facere modi nesciunt minima sunt maiores. Sint iure suscipit placeat error hic, itaque asperiores ipsum architecto, alias, unde porro facilis? Corrupti commodi autem beatae quos ipsum culpa animi. Voluptas eum, repellat assumenda nostrum porro dolore reprehenderit, voluptatum deleniti nam id facere suscipit, ut excepturi? Recusandae tenetur atque asperiores perferendis sed.Delectus blanditiis ea doloremque earum itaque, iste assumenda nostrum temporibus ipsum pariatur, porro ad quidem, tenetur dolores voluptatem. Voluptas pariatur itaque maxime recusandae accusamus eos blanditiis, facere aspernatur quae inventore! Consectetur et, molestias reiciendis possimus cupiditate esse a autem iure recusandae placeat molestiae commodi distinctio numquam obcaecati quam nostrum aperiam explicabo enim reprehenderit ipsa voluptatem! Numquam corrupti voluptatum deleniti voluptatem. Magnam, fugit dolorum? Maxime exercitationem distinctio officiis et? Repellat porro cum nisi assumenda quaerat distinctio ratione aliquid facere quam minus, vitae itaque architecto atque iure, tenetur ipsum aspernatur? Quaerat, in!"
                    : ""}
                </p>
                <p className="font-medium text-lg text-center">
                  {upcomimg ? "" : <div className="  "></div>}
                </p>
                <p>
                  {facebook ? <FacebookEmbeded appId={849920522233544} /> : ""}
                </p>
                <p className="font-medium text-lg text-center">
                  {instagram ? (
                    <InstagramProfile username="cristiano" />
                  ) : (
                    <div className=" "></div>
                  )}
                </p>
                <p className="font-medium text-lg text-center">
                  {twitter ? "" : <TwitterEmbed twitterId={data.twitterId} />}
                </p>
                <p className="font-medium text-lg text-center">
                  {youtube ? (
                    <YouTubeProfile channelId={data.youtubeId} />
                  ) : (
                    <div></div>
                  )}
                </p>
                {/* <p>{stat ? <PerformerStats data={data} /> : ""}</p> */}
              </div>
            </div>
          </div>

          <div className=" lg:hidden flex flex-col gap-5 rounded  px-3">
            <div className=" lg:hidden flex flex-col gap-5 rounded pt-0  ">
              <div className="rounded p-2 shadow ">
                <h1 className="text-lg font-medium text-gray-900 p-2 border-b ">
                  Oragnizer Category
                </h1>
                <section className="flex lg:flex-col flex-row overflow-x-scroll gap-2 pt-3 ">
                  <div className="flex gap-2 ">
                    <div
                      onClick={() => {
                        setCategory("event planner");
                        navigate("/getOrganizer", { state: category });
                      }}
                      className="cursor-pointer bg-gray-200 hover:bg-[#ff2459] hover:text-white    w-max rounded-full font-medium p-1 px-4 text-xs "
                    >
                      Event Planner
                    </div>
                    <div
                      onClick={() => {
                        setCategory("wedding planner");
                        navigate("/getOrganizer", { state: category });
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
                        navigate("/getOrganizer", { state: category });
                      }}
                      className="cursor-pointer bg-gray-200 whitespace-nowrap hover:bg-[#ff2459] hover:text-white   w-max rounded-full font-medium p-1 px-4 text-xs "
                    >
                      Adventure
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
                      <FaSquareFacebook className="text-blue-700 relative " />
                    </button>
                    <button
                      onClick={() => handleShare("whatsapp")}
                      className="flex gap-1 shadow border p-1 rounded"
                    >
                      <IoLogoWhatsapp className="text-green-600" />
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
                      <FaSquareXTwitter className="" />
                    </button>
                  </div>
                </h1>
                <div className="flex justify-center items-center ">
                  <div className="flex  gap-5 p-3 overflow-x-scroll ">
                    <div className="bg-blue-600 rounded h-28 min-w-28 text-white font-medium flex flex-col gap-2 items-start p-4 ">
                      <BsCalendar2DateFill className=" text-white  text-2xl font-medium" />

                      <p>Todays 0</p>
                    </div>
                    <div className="bg-orange-400 rounded h-28 min-w-28 font-medium flex flex-col gap-2 items-start p-4 text-white">
                      <BsCalendar2DateFill className=" text-white text-2xl font-medium" />

                      <p>Tommorrow 0</p>
                    </div>
                    <div className="bg-blue-400 rounded h-28 min-w-28 font-medium flex flex-col gap-2 items-start p-4 text-white">
                      <HiOutlineCalendarDateRange className="text-2xl text-white font-medium" />

                      <p className="text-sm p-1">These Weekend 0</p>
                    </div>
                    <div className="bg-green-600  rounded h-28 min-w-28 font-medium flex flex-col gap-2 items-start p-4 text-white">
                      <CalendarCheck className="text-2xl text-white font-medium" />
                      <p>Choose Date</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <h1 className="lg:text-2xl font-medium p-2 pb-1 px-6 text-lg pt-4">
            Organizer Location
          </h1>

          <div className="pl-3">
            <MapContainer data={data} />
          </div>

          {/* <div className="flex justify-between ">
            <div className="text-sm">Visited 4133 Times , 9 Times in Day</div>
          </div> */}
          <div className="lg:pl-0 pl-4 pb-1">
            <FacebookComments
              dataHref="https://www.bezkoder.com/vue-3-authentication-jwt/"
              numPosts={10}
              width="1000"
            />
          </div>
        </div>

        <div className="w-[25%] lg:flex hidden flex-col gap-5 rounded pt-5 pr-3 ">
          <div className="flex flex-col gap-2 px-2 shadow-md p-2">
            <div className="grid grid-cols-3 gap-2 text-xl">
              <button
                onClick={() => handleShare("facebook")}
                className="flex gap-1 shadow border p-1 rounded"
              >
                <span className="text-sm border-r px-2">SHARE </span>
                <FaSquareFacebook className="text-blue-700 relative " />
              </button>
              <button
                onClick={() => handleShare("whatsapp")}
                className="flex gap-1 shadow border p-1 rounded"
              >
                <span className="text-sm border-r px-2">SHARE </span>
                <IoLogoWhatsapp className="text-green-600" />
              </button>
              <button
                onClick={() => handleShare("messenger")}
                className="flex gap-1 shadow border p-1 rounded"
              >
                {" "}
                <span className="text-sm border-r px-2">SHARE </span>
                <FaFacebookMessenger className="text-red-500" />
              </button>
              <button
                onClick={() => handleShare("twitter")}
                className="flex gap-1 shadow border p-1 rounded"
              >
                {" "}
                <span className="text-sm border-r px-2">SHARE </span>
                <FaSquareXTwitter className="" />
              </button>
            </div>
          </div>
          <div className="rounded p-2 shadow ">
            <h1 className="text-lg font-medium text-gray-900 p-3 border-b ">
              Organizer Category
            </h1>
            <section className="flex flex-col gap-2 pt-3 ">
              <div className="flex gap-2 ">
                <div
                  onClick={() => {
                    setCategory("event planner");
                    navigate("/getOrganizer", { state: category });
                  }}
                  className="cursor-pointer bg-gray-200 hover:bg-[#ff2459] hover:text-white   w-max rounded-full font-medium p-1 px-4 text-xs "
                >
                  Event Planner
                </div>
                <div
                  onClick={() => {
                    setCategory("wedding planner");
                    navigate("/getOrganizer", { state: category });
                  }}
                  className="cursor-pointer bg-gray-200 whitespace-nowrap hover:bg-[#ff2459] hover:text-white   w-max rounded-full font-medium p-1 px-4 text-xs "
                >
                  Wedding Planner
                </div>
              </div>
              <div
                onClick={() => {
                  setCategory("adventure");
                  navigate("/getOrganizer", { state: category });
                }}
                className="flex gap-2 px-2"
              >
                <div className="cursor-pointer bg-gray-200 whitespace-nowrap hover:bg-[#ff2459] hover:text-white w-max rounded-full font-medium p-1 px-4 text-xs ">
                  Adventure
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

                  <p>Todays 0</p>
                </div>
                <div className="bg-orange-400 rounded h-28 w-28 font-medium flex flex-col gap-2 items-start p-4 text-white">
                  <BsCalendar2DateFill className=" text-white text-2xl font-medium" />

                  <p>Tommorrow 0</p>
                </div>
                <div className="bg-blue-400 rounded h-28 w-28 font-medium flex flex-col gap-2 items-start p-4 text-white">
                  <HiOutlineCalendarDateRange className="text-2xl text-white font-medium" />

                  <p className="text-sm p-1">These Weekend 0</p>
                </div>
                <div className="bg-green-600 h-28 rounded w-28 font-medium flex flex-col gap-2 items-start p-4 text-white">
                  <CalendarCheck className="text-2xl text-white font-medium" />
                  <p>Choose Date</p>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="rounded border">
            <h1 className="text-lg font-medium text-gray-900 p-3 border-b">
              Popular events
            </h1>
            <div className="flex justify-center items-center p-3">
              <MdOutlineNavigateNext className="text-4xl rounded-full bg-gray-100 " />
            </div>
          </div> */}
        </div>
      </div>
      {ownership && (
        <OwnerShipForm
          setOwnership={setOwnership}
          name={data.name}
          ownership={ownership}
        />
      )}
      {enquiry && (
        <EnquiryForm
          setEnquiry={setEnquiry}
          name={data.name}
          enquiry={enquiry}
        />
      )}
    </div>
  );
}

export default GetOrganizerById;
